"""Serie do wykresów portfolio (lib/realizacjeGsc.js) z zrzutów Search Console.

Uruchomienie z katalogu repo (potrzebne numpy i Pillow):
    python scripts/wykresy-gsc.py

Wejście: public/projects/gsc/{staniax,madamethai,tql,ase-bot}.webp (panele
Performance, wykres dzienny, oba szeregi włączone). Dla każdego dnia odczytuje
wysokość linii kliknięć (niebieska) i wyświetleń (fioletowa) w kolumnie danego
dnia, przelicza piksele na wartości z siatki osi i skaluje serię tak, żeby
suma była równa kafelkom Total clicks / Total impressions nad wykresem.
Gdy linia jest zasłonięta drugą linią, bierze jej wysokość; gdy obie leżą na
osi, wartość 0. Parametry osi (x0, krok dnia, y zera, y szczytu) zmierzone
na zrzutach 1600x726; TQL nie ma osi (włączona pozycja), więc jego kształt
jest skalowany wyłącznie do sum 2 / 296.
"""
from pathlib import Path
from PIL import Image
import numpy as np, datetime as dt

KAT = Path('public/projects/gsc')
KOL={'klik':(66,133,244),'wysw':(94,53,177)}
def maska(a,c,tol=48):
    r,g,b=c
    return (abs(a[:,:,0]-r)<tol)&(abs(a[:,:,1]-g)<tol)&(abs(a[:,:,2]-b)<tol)
def seria(a,m,x0,step,N,ylo,yhi,m2=None,y0=None):
    ys=[]
    for i in range(N):
        x=int(round(x0+i*step))
        cols=[c for c in (x-1,x,x+1) if 0<=c<a.shape[1]]
        pts=np.concatenate([np.where(m[ylo:yhi,c])[0]+ylo for c in cols])
        if len(pts)==0 and m2 is not None:
            pts=np.concatenate([np.where(m2[ylo:yhi,c])[0]+ylo for c in cols])
        if len(pts)==0 and y0 is not None:
            ys.append(float(y0)); continue
        if len(pts)==0: ys.append(None); continue
        # sasiedztwo: pol kroku w lewo/prawo
        def sr(xx):
            xx=int(round(xx)); p=np.where(m[ylo:yhi,max(0,xx)])[0]
            return p.mean()+ylo if len(p) else None
        L=sr(x-step*0.45) if i>0 else None; R=sr(x+step*0.45) if i<N-1 else None
        top,bot,med=pts.min(),pts.max(),np.median(pts)
        if L is not None and R is not None and L>med and R>med: y=top+1
        elif L is not None and R is not None and L<med and R<med: y=bot-1
        elif i==0 and R is not None: y= top+1 if R>med else (bot-1 if R<med else med)
        elif i==N-1 and L is not None: y= top+1 if L>med else (bot-1 if L<med else med)
        else: y=med
        ys.append(float(y))
    # luki: interpolacja
    for i,y in enumerate(ys):
        if y is None:
            l=next((j for j in range(i,-1,-1) if ys[j] is not None),None); r=next((j for j in range(i,len(ys)) if ys[j] is not None),None)
            ys[i]= ys[l] if r is None else ys[r] if l is None else ys[l]+(ys[r]-ys[l])*(i-l)/(r-l)
    return ys


def zapisz(dane):
    p = Path('lib/realizacjeGsc.js')
    s = p.read_text(encoding='utf-8')
    poczatek = s.index('export const SERIE_GSC')
    out = 'export const SERIE_GSC = {\n'
    for k, v in dane.items():
        out += f"  '{k}': [\n" + ''.join(f"    ['{a}', '{b}', {c}, {w}],\n" for a, b, c, w in v) + '  ],\n'
    p.write_text(s[:poczatek] + out + '};\n', encoding='utf-8')

P={
 'staniax':dict(x0=534,step=(1495-534)/91,N=92,y0=635.5,ytop=434.5,kmax=6,wmax=180,start='2026-05-22',suma=(152,6340),kosz=7),
 'madamethai':dict(x0=534,step=(1497-534)/25,N=26,y0=644.5,ytop=441.5,kmax=24,wmax=750,start='2026-07-27',suma=(187,10100),kosz=1),
 'tql':dict(x0=540,step=(1510-540)/17,N=18,y0=612.5,ytop=None,kmax=None,wmax=None,start='2026-08-05',suma=(2,296),kosz=1),
 'ase-bot':dict(x0=535,step=(1494-535)/91,N=92,y0=639.5,ytop=437.5,kmax=6,wmax=450,start='2026-05-22',suma=(28,7710),kosz=7),
}
def rozdziel(v,suma):
    v=np.array(v,float); v=np.clip(v,0,None)
    if v.sum()==0: return [0]*len(v)
    v=v*suma/v.sum(); f=np.floor(v).astype(int); r=suma-f.sum()
    for i in np.argsort(-(v-f))[:r]: f[i]+=1
    return [int(x) for x in f]
dane={}
for n,p in P.items():
    a=np.asarray(Image.open(KAT / f'{n}.webp').convert('RGB')).astype(int)
    ser={}
    for k,c in KOL.items():
        m=maska(a,c); m2=maska(a,KOL['wysw' if k=='klik' else 'klik'])
        ytop=p['ytop'] if p['ytop'] else 400
        ys=seria(a,m,p['x0'],p['step'],p['N'],int(ytop)-8,int(p['y0'])+4,m2=m2,y0=p['y0'])
        h=[max(0.0,p['y0']-y-1.0 if p['ytop'] is None else p['y0']-y) for y in ys]
        ser[k]=rozdziel(h, p['suma'][0] if k=='klik' else p['suma'][1])
    s0=dt.date.fromisoformat(p['start']); N=p['N']; K=p['kosz']
    # kosze od konca, nadmiar dni dolaczony do pierwszego kosza
    granice=[]; e=N
    while e>0:
        b=max(0,e-K); granice.append((b,e)); e=b
    granice=granice[::-1]
    if K>1 and granice[0][1]-granice[0][0]<K:
        (b0,e0),(b1,e1)=granice[0],granice[1]; granice=[(b0,e1)]+granice[2:]
    pk=[]
    for b,e in granice:
        pk.append([ (s0+dt.timedelta(b)).isoformat(), (s0+dt.timedelta(e-1)).isoformat(), sum(ser['klik'][b:e]), sum(ser['wysw'][b:e]) ])
    dane[n]=pk
    print(n, len(pk), 'klik',sum(x[2] for x in pk),'wysw',sum(x[3] for x in pk), pk[:2], pk[-1])
zapisz(dane)
