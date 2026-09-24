'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '../i18n/routing';
import { track } from '@/lib/track';
import { blogPosts, isPostAvailableIn } from '@/lib/blogPosts';
import { hash, homeHash, sectionId } from '@/lib/anchors';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [triggerPos, setTriggerPos] = useState({ x: 0, y: 0 });
  const lang = useLocale();
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  // Podstrony z własnym formularzem (landingi Google Ads) wysyłały „Kontakt”
  // i „Darmowa Wycena” na stronę główną: 7 MB sceny 3D zamiast formularza,
  // który był kilka ekranów niżej. Gdy formularz jest na tej stronie, link
  // przewija do niego; bez JS i na stronach bez formularza zostaje /#kontakt.
  const goToContact = (e) => {
    const local = document.getElementById(sectionId('kontakt', lang));
    closeMenu();
    if (!local) return;
    e.preventDefault();
    local.scrollIntoView({ behavior: 'smooth', block: 'start' });
    try { window.history.replaceState(null, '', hash('kontakt', lang)); } catch (err) {}
  };

  const toggleLang = (newLocale) => {
    if (lang === newLocale) return;
    // Sesja z USA przełączająca /en na polski to sygnał złego targetowania reklam.
    track('language_switch', { from: lang, to: newLocale, page_path: pathname });
    // Articles can be published in one language only. Swapping the locale on the
    // same path would land on a URL that does not exist in the target language,
    // or serve the wrong language under it, so fall back to the blog index.
    const post = blogPosts.find(p => p.slug === pathname);
    const hasTranslation = !post || isPostAvailableIn(post, newLocale);
    router.replace(hasTranslation ? pathname : '/blog', { locale: newLocale });
  };

  useEffect(() => {
    const p = typeof window !== 'undefined' ? window.location.pathname : '';
    const isSubpage = p !== '/' && p !== '/pl' && p !== '/en' && p !== '/pl/' && p !== '/en/';
    const handleScroll = () => {
      setScrolled(isSubpage || window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = (e) => {
    if (menuOpen) {
      closeMenu();
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      // Ensure we get valid coordinates, default to top right if something fails
      const x = rect.left > 0 ? rect.left + rect.width / 2 : window.innerWidth - 40;
      const y = rect.top > 0 ? rect.top + rect.height / 2 : 40;
      
      setTriggerPos({ x, y });
      setMenuOpen(true);
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setMenuExpanded(true);
        });
      });
    }
  };

  const closeMenu = () => {
    setMenuExpanded(false);
    setTimeout(() => {
      setMenuOpen(false);
    }, 700);
  };

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`} id="header">
        <div 
          className="nav-container" 
          style={{ 
            maxWidth: scrolled ? 'var(--container-width)' : '100%', 
            padding: scrolled ? '0 1.5rem' : '0 3vw',
            margin: '0 auto',
            width: '100%',
            transition: 'max-width 0.7s cubic-bezier(0.7, 0, 0.3, 1), padding 0.7s cubic-bezier(0.7, 0, 0.3, 1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link href="/" className="logo" aria-label={lang === 'pl' ? 'Strona główna AI SEO COMPANY' : 'AI SEO COMPANY homepage'} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', overflow: 'visible' }}>
              <span className="sr-only">{lang === 'pl' ? 'Strona główna AI SEO COMPANY' : 'AI SEO COMPANY homepage'}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 240 1802 294" 
                overflow="visible"
                style={{ 
                  height: 'clamp(22px, 1.8vw, 26px)', 
                  width: 'auto', 
                  display: 'block',
                  transition: 'all 0.5s ease' 
                }}
              >
                {/* Text AI SEO COMPANY - dynamically changes color on scroll */}
                <g fill={scrolled ? '#0F172A' : '#FFFFFF'} style={{ transition: 'fill 0.5s ease' }}>
                  <path d="M 1386 282 L 1388 287 L 1394 296 L 1398 304 L 1413 328 L 1472 427 L 1476 434 L 1477 436 L 1477 529 L 1527 529 L 1527 436 L 1528 434 L 1529 432 L 1533 425 L 1543 408 L 1547 401 L 1583 341 L 1590 329 L 1594 322 L 1595 320 L 1595 315 L 1593 306 L 1593 303 L 1594 295 L 1595 291 L 1596 290 L 1596 288 L 1589 289 L 1581 291 L 1573 292 L 1564 293 L 1552 294 L 1551 297 L 1549 299 L 1542 313 L 1522 350 L 1507 380 L 1505 387 L 1504 389 L 1502 391 L 1499 386 L 1493 371 L 1492 369 L 1491 367 L 1484 354 L 1472 332 L 1448 288 L 1446 286 L 1445 283 Z M 1332 282 L 1332 426 L 1334 450 L 1333 461 L 1331 458 L 1329 454 L 1316 427 L 1309 415 L 1306 410 L 1303 405 L 1293 389 L 1238 301 L 1234 295 L 1219 295 L 1209 294 L 1202 293 L 1195 292 L 1190 291 L 1181 289 L 1177 288 L 1174 286 L 1172 286 L 1170 285 L 1170 529 L 1222 528 L 1222 410 L 1221 382 L 1219 362 L 1220 349 L 1222 352 L 1224 357 L 1228 366 L 1237 383 L 1242 392 L 1249 404 L 1258 419 L 1273 443 L 1325 526 L 1327 529 L 1383 529 L 1383 282 Z M 1079 282 L 1076 283 L 1064 290 L 1059 292 L 1054 294 L 1051 295 L 1048 296 L 1044 297 L 1040 298 L 1035 299 L 1022 300 L 1019 300 L 1009 300 L 1008 303 L 1005 314 L 1003 317 L 993 346 L 972 407 L 952 468 L 940 500 L 931 527 L 931 529 L 986 529 L 986 527 L 988 523 L 991 514 L 997 493 L 1003 475 L 1005 473 L 1094 474 L 1095 477 L 1097 483 L 1111 525 L 1112 529 L 1168 529 L 1167 526 L 1165 520 L 1162 511 L 1154 489 L 1139 446 L 1094 320 L 1087 300 L 1083 286 L 1081 282 Z M 1048 324 L 1049 328 L 1050 332 L 1053 343 L 1057 358 L 1061 372 L 1069 400 L 1080 432 L 1017 432 L 1018 429 L 1019 425 L 1026 406 L 1034 378 L 1038 363 L 1046 328 Z M 752 283 L 752 529 L 803 529 L 804 447 L 863 447 L 871 446 L 875 445 L 882 443 L 885 442 L 888 441 L 895 438 L 897 437 L 905 432 L 910 428 L 921 417 L 924 413 L 926 410 L 932 398 L 935 389 L 936 384 L 937 379 L 938 366 L 938 364 L 937 351 L 936 346 L 935 341 L 932 332 L 930 327 L 927 321 L 925 318 L 923 315 L 920 311 L 910 301 L 898 293 L 896 292 L 889 289 L 884 287 L 880 286 L 872 284 L 865 283 L 854 282 Z M 804 324 L 850 324 L 856 325 L 859 326 L 862 327 L 870 331 L 875 335 L 876 336 L 880 341 L 884 349 L 885 352 L 886 357 L 886 373 L 885 378 L 884 381 L 880 389 L 877 393 L 874 396 L 870 399 L 867 401 L 865 402 L 863 403 L 860 404 L 857 405 L 852 406 L 803 405 Z M 465 282 L 465 529 L 515 529 L 515 393 L 513 352 L 514 335 L 516 339 L 518 346 L 519 353 L 521 360 L 531 394 L 540 421 L 550 449 L 575 519 L 577 522 L 578 527 L 579 529 L 622 528 L 623 525 L 625 517 L 627 514 L 633 497 L 645 463 L 658 426 L 667 399 L 670 389 L 682 347 L 684 336 L 686 332 L 687 342 L 685 380 L 685 529 L 735 529 L 735 282 L 658 283 L 657 285 L 656 290 L 651 302 L 643 325 L 635 348 L 626 374 L 622 386 L 615 407 L 613 415 L 603 459 L 602 463 L 601 464 L 600 466 L 599 461 L 596 448 L 590 424 L 586 409 L 584 402 L 578 384 L 566 350 L 548 299 L 543 285 L 542 283 Z M 325 279 L 319 280 L 313 281 L 309 282 L 305 283 L 296 286 L 289 289 L 287 290 L 285 291 L 278 295 L 273 298 L 269 301 L 263 306 L 255 314 L 250 320 L 247 324 L 245 327 L 243 330 L 240 335 L 238 339 L 235 345 L 233 350 L 229 362 L 228 366 L 227 371 L 226 376 L 225 383 L 224 393 L 224 419 L 225 429 L 226 436 L 227 441 L 230 453 L 231 456 L 232 459 L 234 464 L 241 478 L 244 483 L 246 486 L 249 490 L 252 494 L 266 508 L 270 511 L 273 513 L 276 515 L 281 518 L 285 520 L 291 523 L 296 525 L 308 529 L 313 530 L 318 531 L 325 532 L 339 533 L 341 533 L 355 532 L 363 531 L 368 530 L 378 527 L 381 526 L 386 524 L 400 517 L 403 515 L 406 513 L 410 510 L 415 506 L 425 496 L 429 491 L 432 487 L 434 484 L 436 481 L 439 476 L 442 470 L 445 463 L 447 458 L 448 455 L 449 452 L 450 448 L 451 444 L 452 439 L 453 434 L 454 427 L 455 414 L 455 399 L 454 385 L 453 378 L 452 372 L 449 360 L 446 351 L 444 346 L 437 332 L 431 323 L 428 319 L 422 313 L 422 312 L 417 307 L 411 302 L 407 299 L 404 297 L 399 294 L 394 291 L 392 290 L 390 289 L 383 286 L 374 283 L 370 282 L 366 281 L 361 280 L 353 279 Z M 335 323 L 343 323 L 352 324 L 357 325 L 360 326 L 365 328 L 374 333 L 379 337 L 385 343 L 388 347 L 390 350 L 392 353 L 394 357 L 397 363 L 400 372 L 401 376 L 402 380 L 403 387 L 404 398 L 404 414 L 403 424 L 402 431 L 401 435 L 400 439 L 396 451 L 395 453 L 391 460 L 389 463 L 387 466 L 377 476 L 373 479 L 369 481 L 363 484 L 360 485 L 357 486 L 352 487 L 344 488 L 334 488 L 326 487 L 319 485 L 314 483 L 306 479 L 301 475 L 292 466 L 289 462 L 287 459 L 283 451 L 281 446 L 280 443 L 279 440 L 278 436 L 277 432 L 276 425 L 275 417 L 275 394 L 276 386 L 277 380 L 278 376 L 279 371 L 282 363 L 288 351 L 290 348 L 293 344 L 300 337 L 305 333 L 310 330 L 312 329 L 314 328 L 319 326 L 323 325 L 327 324 Z M 102 279 L 93 280 L 88 281 L 84 282 L 77 284 L 72 286 L 67 288 L 63 290 L 57 293 L 52 296 L 49 298 L 46 300 L 41 304 L 28 317 L 25 321 L 22 325 L 20 328 L 18 331 L 15 337 L 10 347 L 8 352 L 5 361 L 4 365 L 3 370 L 2 375 L 1 381 L 0 390 L 0 421 L 1 430 L 2 437 L 3 442 L 4 446 L 5 450 L 9 462 L 11 467 L 13 471 L 16 477 L 19 482 L 21 485 L 23 488 L 26 492 L 31 498 L 38 505 L 44 510 L 48 513 L 53 516 L 60 520 L 62 521 L 64 522 L 71 525 L 80 528 L 84 529 L 88 530 L 93 531 L 99 532 L 116 533 L 130 532 L 137 531 L 142 530 L 147 529 L 159 525 L 164 523 L 166 522 L 168 521 L 175 517 L 178 515 L 181 513 L 185 510 L 201 494 L 204 490 L 206 487 L 208 484 L 211 479 L 214 473 L 218 463 L 220 456 L 221 452 L 222 446 L 222 444 L 171 444 L 171 446 L 170 447 L 170 450 L 169 453 L 167 458 L 166 460 L 163 465 L 160 469 L 153 476 L 147 480 L 144 482 L 139 484 L 136 485 L 133 486 L 129 487 L 120 488 L 111 488 L 103 487 L 98 486 L 95 485 L 92 484 L 88 482 L 82 479 L 78 476 L 67 465 L 65 462 L 63 459 L 61 455 L 58 449 L 55 441 L 54 437 L 53 432 L 52 427 L 51 419 L 51 393 L 52 385 L 53 379 L 54 375 L 55 371 L 56 368 L 58 363 L 64 351 L 66 348 L 71 342 L 76 337 L 80 334 L 83 332 L 86 330 L 88 329 L 93 327 L 96 326 L 99 325 L 104 324 L 113 323 L 118 323 L 128 324 L 132 325 L 136 326 L 141 328 L 147 331 L 150 333 L 158 340 L 159 341 L 162 345 L 164 348 L 168 356 L 169 359 L 170 362 L 170 365 L 171 367 L 222 367 L 221 361 L 220 356 L 219 352 L 218 348 L 217 345 L 215 340 L 208 326 L 206 323 L 204 320 L 201 316 L 186 301 L 182 298 L 179 296 L 174 293 L 170 291 L 164 288 L 159 286 L 147 282 L 142 281 L 137 280 L 129 279 Z" fillRule="evenodd" />
                </g>

                {/* Orange Rays */}
                <g fill="#D85A30">
                  <path d="M 954 120 L 952 121 L 950 122 L 914 158 L 911 160 L 909 161 L 901 161 L 892 157 L 886 152 L 883 150 L 875 146 L 872 145 L 869 144 L 865 143 L 860 142 L 847 142 L 842 143 L 838 144 L 835 145 L 832 146 L 830 147 L 821 152 L 818 154 L 813 158 L 799 172 L 794 179 L 792 182 L 787 191 L 786 193 L 785 195 L 784 198 L 783 202 L 782 206 L 781 212 L 781 223 L 782 227 L 785 233 L 789 237 L 792 239 L 794 240 L 798 241 L 808 241 L 812 240 L 815 239 L 820 237 L 840 227 L 853 220 L 858 217 L 863 214 L 869 210 L 878 204 L 885 199 L 894 192 L 899 188 L 904 184 L 911 178 L 924 165 L 926 164 L 928 163 L 931 162 L 933 162 L 935 164 L 935 172 L 934 180 L 930 199 L 929 207 L 929 236 L 930 241 L 931 244 L 932 247 L 936 255 L 943 262 L 945 263 L 948 264 L 951 265 L 955 265 L 959 267 L 960 269 L 961 272 L 963 275 L 973 285 L 977 288 L 985 292 L 997 296 L 1001 297 L 1006 298 L 1033 298 L 1039 297 L 1043 296 L 1047 295 L 1056 292 L 1061 290 L 1071 285 L 1080 281 L 1087 277 L 1102 268 L 1111 262 L 1126 252 L 1133 247 L 1140 242 L 1164 224 L 1173 217 L 1193 201 L 1197 198 L 1198 197 L 1199 195 L 1199 193 L 1198 190 L 1196 188 L 1191 188 L 1183 192 L 1180 194 L 1172 200 L 1141 223 L 1133 230 L 1125 236 L 1115 243 L 1112 245 L 1101 252 L 1094 256 L 1076 265 L 1069 268 L 1063 270 L 1051 274 L 1046 275 L 1040 276 L 1026 276 L 1022 275 L 1018 274 L 1014 272 L 1008 269 L 1003 265 L 1002 264 L 999 260 L 998 258 L 999 255 L 1001 255 L 1004 253 L 1009 252 L 1024 246 L 1031 243 L 1038 240 L 1047 236 L 1058 231 L 1071 225 L 1098 212 L 1106 208 L 1110 205 L 1113 202 L 1114 200 L 1115 198 L 1115 193 L 1114 191 L 1112 189 L 1109 188 L 1106 188 L 1097 192 L 1082 200 L 1056 212 L 1047 216 L 1038 220 L 1017 229 L 1005 234 L 1000 235 L 997 237 L 994 236 L 994 225 L 995 192 L 994 189 L 991 185 L 988 183 L 986 182 L 983 181 L 978 181 L 974 182 L 972 183 L 967 188 L 965 191 L 960 202 L 959 205 L 956 215 L 955 220 L 954 226 L 954 239 L 952 243 L 950 241 L 949 239 L 948 236 L 948 209 L 949 199 L 951 188 L 952 183 L 954 174 L 960 153 L 963 133 L 965 129 L 965 126 L 964 124 L 960 120 Z M 858 174 L 864 174 L 870 175 L 875 177 L 878 180 L 878 184 L 875 188 L 871 192 L 866 196 L 863 198 L 856 202 L 836 212 L 829 214 L 824 216 L 822 218 L 819 219 L 817 219 L 814 218 L 812 216 L 811 216 L 810 212 L 811 210 L 814 205 L 816 202 L 820 197 L 830 187 L 836 182 L 839 180 L 844 178 L 847 177 L 850 176 L 854 175 Z M 1010 50 L 1008 51 L 1006 54 L 1002 61 L 1001 63 L 999 68 L 997 73 L 996 76 L 995 79 L 992 91 L 990 103 L 991 109 L 993 110 L 997 111 L 1001 111 L 1004 110 L 1006 109 L 1008 108 L 1013 103 L 1014 101 L 1015 99 L 1017 93 L 1021 81 L 1025 67 L 1025 60 L 1024 56 L 1018 50 Z M 1242 0 L 1234 1 L 1228 2 L 1224 3 L 1220 4 L 1208 8 L 1204 10 L 1198 13 L 1189 19 L 1183 24 L 1176 31 L 1172 36 L 1169 40 L 1166 44 L 1163 49 L 1162 52 L 1161 55 L 1161 63 L 1162 66 L 1163 69 L 1164 71 L 1165 73 L 1167 76 L 1173 83 L 1179 88 L 1182 90 L 1185 92 L 1190 95 L 1194 97 L 1200 100 L 1214 106 L 1262 126 L 1278 133 L 1287 137 L 1289 138 L 1291 139 L 1298 143 L 1303 146 L 1311 151 L 1314 153 L 1321 158 L 1325 161 L 1330 165 L 1335 169 L 1343 176 L 1353 189 L 1346 190 L 1338 191 L 1321 192 L 1296 195 L 1288 196 L 1282 197 L 1266 200 L 1261 201 L 1256 202 L 1247 204 L 1230 208 L 1223 210 L 1216 212 L 1199 217 L 1187 221 L 1182 223 L 1175 226 L 1162 232 L 1159 234 L 1155 237 L 1151 241 L 1147 246 L 1145 249 L 1144 251 L 1143 254 L 1143 261 L 1146 267 L 1152 273 L 1156 276 L 1159 278 L 1162 280 L 1167 283 L 1169 284 L 1172 284 L 1175 286 L 1178 287 L 1182 288 L 1191 290 L 1197 291 L 1203 292 L 1212 293 L 1225 294 L 1248 294 L 1257 293 L 1264 292 L 1270 291 L 1286 287 L 1292 285 L 1301 282 L 1306 280 L 1311 278 L 1329 269 L 1336 265 L 1341 262 L 1344 260 L 1348 257 L 1353 253 L 1359 247 L 1363 242 L 1365 239 L 1368 234 L 1369 232 L 1370 230 L 1372 225 L 1373 221 L 1374 213 L 1375 209 L 1376 207 L 1379 204 L 1381 203 L 1387 202 L 1416 201 L 1445 200 L 1466 201 L 1465 203 L 1461 209 L 1455 221 L 1454 224 L 1453 227 L 1452 231 L 1451 236 L 1451 251 L 1452 256 L 1453 259 L 1457 267 L 1460 271 L 1467 278 L 1470 280 L 1473 282 L 1481 286 L 1490 289 L 1494 290 L 1499 291 L 1504 292 L 1513 293 L 1531 294 L 1533 294 L 1552 293 L 1571 291 L 1579 290 L 1587 288 L 1594 287 L 1597 288 L 1597 291 L 1596 292 L 1595 297 L 1595 312 L 1596 319 L 1597 323 L 1598 326 L 1601 332 L 1604 336 L 1608 340 L 1611 342 L 1613 343 L 1616 344 L 1619 345 L 1625 346 L 1633 346 L 1639 345 L 1647 342 L 1661 335 L 1669 330 L 1674 326 L 1680 321 L 1692 309 L 1696 304 L 1699 300 L 1699 299 L 1703 294 L 1705 295 L 1709 297 L 1713 300 L 1715 301 L 1728 307 L 1734 309 L 1770 327 L 1785 334 L 1790 336 L 1797 336 L 1799 335 L 1801 332 L 1799 330 L 1796 328 L 1795 328 L 1789 323 L 1780 318 L 1765 310 L 1740 297 L 1730 292 L 1724 290 L 1718 287 L 1709 282 L 1707 280 L 1707 278 L 1708 264 L 1707 261 L 1706 258 L 1705 256 L 1702 252 L 1698 248 L 1695 246 L 1692 244 L 1690 243 L 1687 242 L 1681 241 L 1679 238 L 1680 235 L 1679 233 L 1677 231 L 1675 230 L 1673 229 L 1667 228 L 1659 229 L 1655 230 L 1652 231 L 1644 235 L 1639 238 L 1634 241 L 1631 243 L 1626 247 L 1620 252 L 1612 260 L 1608 265 L 1605 269 L 1604 272 L 1602 274 L 1599 275 L 1594 276 L 1584 278 L 1578 279 L 1572 280 L 1565 281 L 1557 282 L 1546 283 L 1523 283 L 1512 282 L 1507 281 L 1502 280 L 1490 276 L 1484 273 L 1481 271 L 1478 269 L 1473 264 L 1471 261 L 1470 259 L 1469 257 L 1468 254 L 1467 251 L 1467 233 L 1468 227 L 1471 218 L 1473 214 L 1476 208 L 1481 200 L 1490 198 L 1511 198 L 1530 197 L 1532 196 L 1533 190 L 1535 189 L 1541 189 L 1546 188 L 1558 185 L 1565 183 L 1567 182 L 1569 181 L 1572 179 L 1576 176 L 1578 173 L 1579 171 L 1580 169 L 1581 166 L 1581 157 L 1580 153 L 1579 151 L 1577 148 L 1572 143 L 1569 141 L 1563 138 L 1560 137 L 1556 136 L 1541 136 L 1537 137 L 1534 138 L 1529 140 L 1515 147 L 1512 149 L 1509 151 L 1505 154 L 1500 158 L 1484 174 L 1479 181 L 1476 184 L 1455 185 L 1428 186 L 1402 186 L 1401 187 L 1376 187 L 1372 186 L 1370 185 L 1368 184 L 1360 176 L 1360 175 L 1351 166 L 1343 159 L 1338 155 L 1334 152 L 1330 149 L 1324 145 L 1315 139 L 1310 136 L 1305 133 L 1296 128 L 1284 122 L 1247 104 L 1240 100 L 1233 95 L 1222 87 L 1217 83 L 1212 79 L 1207 75 L 1205 73 L 1203 70 L 1202 68 L 1202 64 L 1203 62 L 1204 60 L 1212 52 L 1220 47 L 1229 42 L 1235 39 L 1240 37 L 1244 37 L 1248 36 L 1256 32 L 1260 28 L 1261 26 L 1262 22 L 1262 17 L 1261 13 L 1260 11 L 1259 9 L 1254 4 L 1252 3 L 1250 2 L 1247 1 Z M 1664 261 L 1665 264 L 1667 267 L 1669 270 L 1678 279 L 1682 282 L 1688 286 L 1689 286 L 1690 289 L 1687 295 L 1682 302 L 1675 310 L 1672 313 L 1666 318 L 1663 320 L 1660 322 L 1655 325 L 1653 326 L 1644 329 L 1640 330 L 1628 330 L 1626 329 L 1623 327 L 1621 325 L 1619 322 L 1618 320 L 1617 314 L 1618 307 L 1619 303 L 1620 300 L 1621 297 L 1623 292 L 1625 288 L 1628 282 L 1631 279 L 1635 278 L 1652 273 L 1657 271 L 1659 270 L 1662 267 L 1663 265 Z M 1679 249 L 1686 249 L 1688 250 L 1690 252 L 1691 252 L 1692 253 L 1692 254 L 1694 256 L 1695 259 L 1695 263 L 1696 264 L 1696 267 L 1694 274 L 1692 273 L 1690 271 L 1687 270 L 1684 268 L 1681 266 L 1674 259 L 1674 257 L 1673 255 L 1674 253 L 1677 250 Z M 1665 246 L 1665 249 L 1664 252 L 1663 262 L 1660 259 L 1656 259 L 1652 260 L 1648 262 L 1644 261 L 1648 257 L 1653 253 L 1656 251 L 1659 249 L 1663 247 Z M 1340 206 L 1356 206 L 1358 207 L 1361 210 L 1361 215 L 1357 226 L 1356 228 L 1355 230 L 1340 245 L 1336 248 L 1333 250 L 1330 252 L 1325 255 L 1323 256 L 1321 257 L 1316 259 L 1311 260 L 1306 263 L 1301 265 L 1283 271 L 1279 272 L 1275 273 L 1260 276 L 1251 277 L 1240 277 L 1239 278 L 1229 278 L 1213 277 L 1205 276 L 1198 275 L 1191 274 L 1184 272 L 1179 270 L 1174 268 L 1166 264 L 1162 260 L 1162 258 L 1162 255 L 1162 253 L 1163 251 L 1167 247 L 1170 245 L 1173 243 L 1175 242 L 1177 242 L 1179 241 L 1183 238 L 1187 236 L 1193 234 L 1202 231 L 1212 228 L 1223 225 L 1231 223 L 1243 220 L 1257 217 L 1262 216 L 1267 215 L 1278 213 L 1291 211 L 1298 210 L 1306 209 L 1315 208 L 1325 207 Z M 1546 150 L 1551 150 L 1554 151 L 1556 152 L 1561 157 L 1560 163 L 1557 164 L 1552 166 L 1548 167 L 1544 168 L 1536 169 L 1512 168 L 1518 162 L 1521 160 L 1524 158 L 1532 154 L 1535 153 L 1538 152 L 1542 151 Z" fillRule="evenodd" />
                </g>
              </svg>
            </Link>
            
            {/* Header Award Badges */}
            <div className="header-award-badges">
              <span className="badge-pill" style={{ 
                color: scrolled ? 'var(--color-text-muted)' : 'rgba(255,255,255,0.85)',
                background: scrolled ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255,255,255,0.1)',
                borderColor: scrolled ? 'var(--color-border)' : 'rgba(255,255,255,0.2)',
                transition: 'all 0.7s ease'
              }}>Top Rated Agency</span>
              <span className="badge-pill" style={{ 
                color: scrolled ? 'var(--color-text-muted)' : 'rgba(255,255,255,0.85)',
                background: scrolled ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255,255,255,0.1)',
                borderColor: scrolled ? 'var(--color-border)' : 'rgba(255,255,255,0.2)',
                transition: 'all 0.7s ease'
              }}>Reviews 4.9★</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Language Switcher (PL | EN) */}
            <div className="lang-switcher" style={{
              background: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255,255,255,0.1)',
              borderColor: scrolled ? 'var(--color-border)' : 'rgba(255,255,255,0.2)',
              color: scrolled ? 'var(--color-text-dark)' : '#FFFFFF',
              transition: 'all 0.7s ease'
            }}>
              <button
                className={`lang-btn ${lang === 'pl' ? 'active' : ''}`}
                style={{ 
                  color: lang === 'pl' ? (scrolled ? 'var(--color-text-dark)' : '#FFFFFF') : (scrolled ? 'var(--color-text-muted)' : 'rgba(255,255,255,0.5)'), 
                  transition: 'color 0.7s ease' 
                }}
                onClick={() => toggleLang('pl')}
                title="Polski"
              >
                PL
              </button>
              <span style={{ opacity: 0.35 }}>|</span>
              <button
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                style={{ 
                  color: lang === 'en' ? (scrolled ? 'var(--color-text-dark)' : '#FFFFFF') : (scrolled ? 'var(--color-text-muted)' : 'rgba(255,255,255,0.5)'), 
                  transition: 'color 0.7s ease' 
                }}
                onClick={() => toggleLang('en')}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Header Hire Us Pill Button */}
            <a href={hash('kontakt', lang)} className="header-hire-btn" data-cta="header" style={{
              background: scrolled ? '#000000' : '#FFFFFF',
              color: scrolled ? '#FFFFFF' : '#000000',
              transition: 'all 0.7s ease'
            }}>
              {t('cta')}
            </a>

            {/* KOTA Circular Menu Toggle Trigger */}
            <button
              className="kota-menu-trigger"
              style={{
                background: scrolled ? '#000000' : '#FFFFFF',
                color: scrolled ? '#FFFFFF' : '#000000',
                transition: 'all 0.7s ease'
              }}
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              title="Toggle Menu"
            >
              ≡
            </button>
          </div>
        </div>
      </header>

      {/* KOTA Full-Screen Immersive Menu.
          Menu bylo renderowane warunkowo ({menuOpen && ...}), przez co 12 linkow
          nawigacji nie istnialo w HTML serwerowym - crawler dostawal z naglowka
          tylko logo i #kontakt. Teraz markup jest zawsze w DOM, a widocznosc
          steruje CSS. visibility:hidden usuwa menu z kolejnosci Tab i z drzewa
          dostepnosci, gdy jest zamkniete, wiec zachowanie dla uzytkownika
          klawiatury pozostaje bez zmian. */}
      <div 
        className="kota-fullscreen-menu"
        aria-hidden={!menuOpen}
        style={{
          clipPath: `circle(${menuExpanded ? '150vmax' : '0px'} at ${triggerPos.x}px ${triggerPos.y}px)`,
          transition: 'clip-path 0.7s cubic-bezier(0.7, 0, 0.2, 1)',
          visibility: menuOpen ? 'visible' : 'hidden',
          pointerEvents: menuOpen ? 'auto' : 'none'
        }}
      >
          {/* Header inside the menu to match placement */}
          <div 
            className="nav-container" 
            style={{ 
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              maxWidth: scrolled ? 'var(--container-width)' : '100%', 
              padding: scrolled ? '0 1.5rem' : '0 3vw',
              margin: '0 auto',
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              paddingTop: scrolled ? '0.9rem' : '1.35rem',
              height: scrolled ? 'auto' : 'auto',
              zIndex: 10
            }}
          >
            <button
              className="kota-menu-trigger close-variant"
              onClick={closeMenu}
              aria-label="Close Menu"
              title="Close Menu"
            >
              ✕
            </button>
          </div>

          <div 
            className="kota-fullscreen-content container"
            style={{ 
              justifyContent: 'flex-start',
              paddingTop: scrolled ? '0.9rem' : '1.35rem' 
            }}
          >
            <ul className="kota-fullscreen-links" style={{ marginTop: 0 }}>
              <li style={{ '--delay': '0.1s' }}>
                <Link href="/#why-us" onClick={closeMenu}>{t('results')}</Link>
              </li>
              <li style={{ '--delay': '0.15s' }}>
                <Link href={homeHash('uslugi', lang)} onClick={closeMenu}>{t('services')}</Link>
              </li>
              <li style={{ '--delay': '0.2s' }}>
                <Link href="/cennik-pozycjonowania" onClick={closeMenu}>{t('pricing')}</Link>
              </li>
              <li style={{ '--delay': '0.25s' }}>
                <Link href="/#portfolio" onClick={closeMenu}>{t('process')}</Link>
              </li>
              <li style={{ '--delay': '0.3s' }}>
                <Link href="/audyt-seo" onClick={closeMenu}>{lang === 'pl' ? 'Audyt SEO' : 'SEO Audit'}</Link>
              </li>
              <li style={{ '--delay': '0.35s' }}>
                <Link href="/pozycjonowanie-stron-internetowych" onClick={closeMenu}>{lang === 'pl' ? 'Pozycjonowanie' : 'SEO Services'}</Link>
              </li>
              <li style={{ '--delay': '0.4s' }}>
                <Link href="/seo-lokalne-warszawa" onClick={closeMenu}>{lang === 'pl' ? 'Lokalne SEO' : 'Local SEO'}</Link>
              </li>
              <li style={{ '--delay': '0.45s' }}>
                <Link href="/projektowanie-stron-internetowych" onClick={closeMenu}>{lang === 'pl' ? 'Tworzenie Stron' : 'Web Design'}</Link>
              </li>
              <li style={{ '--delay': '0.5s' }}>
                <Link href="/blog" onClick={closeMenu}>{t('blog')}</Link>
              </li>
              <li style={{ '--delay': '0.55s' }}>
                <Link href="/o-nas" onClick={closeMenu}>{lang === 'pl' ? 'O Nas' : 'About Us'}</Link>
              </li>
              <li style={{ '--delay': '0.6s' }}>
                <Link href={homeHash('kontakt', lang)} onClick={goToContact} data-cta="menu">{lang === 'pl' ? 'Kontakt' : 'Contact'}</Link>
              </li>
              <li style={{ '--delay': '0.65s' }}>
                <Link href={homeHash('kontakt', lang)} onClick={goToContact} data-cta="menu">{lang === 'pl' ? 'Darmowa Wycena' : 'Free Quote'}</Link>
              </li>
            </ul>

            <div className="kota-fullscreen-footer" style={{ marginTop: 'auto' }}>
              <div className="footer-contact">
                <span className="footer-label">{lang === 'pl' ? 'Napisz do nas' : 'Email Us'}</span>
                <a href="mailto:kontakt@ai-seo-company.pl" className="footer-value" data-cta="menu">kontakt@ai-seo-company.pl</a>
              </div>
              <div className="footer-contact">
                <span className="footer-label">{lang === 'pl' ? 'Zadzwoń' : 'Call us'}</span>
                <a href="tel:+48518815055" className="footer-value" data-cta="menu">518 815 055</a>
              </div>
            </div>
          </div>
      </div>
    </>
  );
}
