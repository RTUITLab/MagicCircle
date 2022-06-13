<template>
  <div class="">
    <div class="header">
      <div class="selects-row">
        <multiselect 
          class="selects-row__item" 
          v-model="selectInst"  
          tag-placeholder="Выберите институт" 
          :limitText="count => `и ${count} еще`" 
          :limit="3" 
          placeholder="Выберите институт" 
          label="name" 
          track-by="id" 
          :options="instituteList" 
          :multiple="true" 
        />
        <multiselect
          class="selects-row__item" 
          v-model="selectDirection" 
          tag-placeholder="Выберите направление" 
          :limit="3"
          :limitText="count => `и ${count} еще`" 
          placeholder="Выберите направление" 
          label="name" 
          track-by="id" 
          :options="directionList" 
           
          :multiple="true" 
        />
        <multiselect 
          class="selects-row__item" 
          v-model="selectProfile" 
          tag-placeholder="Выберите профиль" 
          :limit="3"
          :limitText="count => `и ${count} еще`" 
          placeholder="Выберите профиль" 
          label="name"
          track-by="id" 
          :options="profileList"
          :multiple="true" 
        />
      <button class="btn btn-primary" @click="findSectors"> Найти</button>
      <button class="btn btn-enter" style="margin-left: 60px;" @click="$store.state.isAuth ? $router.push('/admin/addSector') :$router.push('/login')">
        <span v-text="$store.state.isAuth ? 'Панель' : 'Войти'" />
      </button>
      </div>
    </div>
    <div class="wrapper">
      <div class="svg-layer">
        <div>
            <!-- :ok-only="$store.state.isAuth ? false : true" -->
          <b-modal id="my-modal" 
            :title="title" 
            :size="'lg'" 
            scrollable
            header-class="header-preview"
            cancel-title="Отмена"
            ok-title="Сохранить"
          >
            <ModalContent @clearModalContent="clearModalContent" :modalContent="this.modalContent" />
          </b-modal>
        </div>
        <svg class="svg-layer__circle" viewBox="0 0 3000 3000" fill="1" xmlns="http://www.w3.org/2000/svg">
          <!--    Define styles for :active    -->
          <defs>
            <filter id="inset-shadow">

              <feComponentTransfer in="SourceAlpha" result="inset-selection">
                <feFuncA type="discrete" tableValues="0 1 1 1 1 1"/>
              </feComponentTransfer>

              <feComponentTransfer in="SourceGraphic" result="original-no-fill">
                <feFuncA type="discrete" tableValues="0 0 1"/>
              </feComponentTransfer>

              <feColorMatrix type="matrix" in="original-no-fill" result="new-source-alpha" values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              />

              <feGaussianBlur in="new-source-alpha" result="blur" stdDeviation="5"/>
              <feGaussianBlur in="new-source-alpha" result="blur2" stdDeviation="10"/>
              <feGaussianBlur in="new-source-alpha" result="blur3" stdDeviation="15"/>
              <feMerge result="blur">
                <feMergeNode in="blur" mode="normal"/>
                <feMergeNode in="blur2" mode="normal"/>
                <feMergeNode in="blur3" mode="normal"/>
              </feMerge>

              <feComposite operator="in" in="inset-selection" in2="blur" result="inset-blur"/>

              <feComposite operator="over" in="original-no-fill" in2="inset-blur"/>
            </filter>
          </defs>
          <!---->
          <g id="MagicCircle">
            <circle id="L0-CIO" v-b-modal="'my-modal'" cx="1500" cy="1500" r="197"
                    fill-opacity="0.01"
                    fill="#C4C4C4"></circle>

            <path id="L1-HISO" v-b-modal="'my-modal'"
                  d="M1339 1222C1339 1222 1414.5 1174.96 1512.5 1179C1610.5 1183.04 1677.5 1232.5 1677.5 1232.5L1603.5 1332.5C1603.5 1332.5 1566 1304 1507 1303C1448 1302 1413.5 1322.5 1413.5 1322.5L1339 1222Z"
                  fill-opacity="0.01"
                  fill="#C4C4C4"/>
            <path id="L1-CDO" v-b-modal="'my-modal'"
                  d="M1677.5 1232C1677.5 1232 1712 1253.5 1745 1292.5C1778 1331.5 1792.5 1367.5 1792.5 1367.5L1676 1411C1676 1411 1667 1391 1646 1367.5C1625 1344 1604.5 1332 1604.5 1332L1677.5 1232Z"
                  fill="#C4C4C4" fill-opacity="0.01"/>
            <path id="L1_HT" v-b-modal="'my-modal'"
                  d="M1676.5 1411L1792 1367C1792 1367 1812.5 1407 1818.5 1458.5C1824.5 1510 1816 1557.5 1816 1557.5L1694 1536C1694 1536 1700.5 1508.5 1695.5 1470C1690.5 1431.5 1676.5 1411 1676.5 1411Z"
                  fill="#C4C4C4" fill-opacity="0.01"/>
            <path id="L1-HPMO"
                  d="M1694 1536L1815.5 1557.5C1815.5 1557.5 1809.5 1604 1780 1656.5C1750.5 1709 1714 1738.5 1714 1738.5L1640 1639C1640 1639 1659.5 1618.5 1674.5 1592C1689.5 1565.5 1694 1536 1694 1536Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L1-EMPTY"
                  d="M1592 1674.5C1592 1674.5 1606 1666.5 1617.5 1658.5C1629 1650.5 1640 1639 1640 1639L1714.5 1739C1714.5 1739 1697.5 1753 1687 1761C1676.5 1769 1656.5 1780.5 1656.5 1780.5L1592 1674.5Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L1-HD"
                  d="M1352.5 1631C1352.5 1631 1385.5 1675 1456 1692.5C1526.5 1710 1592 1675 1592 1675L1656 1780.5C1656 1780.5 1564.5 1838 1443 1816C1321.5 1794 1256 1708 1256 1708L1352.5 1631Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L1-HITPS"
                  d="M1339 1222L1413 1322.5C1413 1322.5 1328.02 1358.5 1307 1460C1285.57 1563.5 1352 1631 1352 1631L1255.5 1708.5C1255.5 1708.5 1160.23 1606.5 1182 1454.5C1205.42 1291 1339 1222 1339 1222Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>

            <path id="L2-TL1"
                  d="M1251.5 1104.5C1251.5 1104.5 1359.97 1031.55 1507 1033C1659.5 1034.5 1763.5 1114.5 1763.5 1114.5L1677.5 1232C1677.5 1232 1606.5 1181.71 1511 1178.5C1412.5 1175.18 1339 1222 1339 1222L1251.5 1104.5Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L2-TL2"
                  d="M1678 1232L1763.5 1114.5C1763.5 1114.5 1815.5 1146.5 1868 1212.5C1907.18 1261.76 1929 1316 1929 1316L1792.5 1367C1792.5 1367 1772.18 1323.73 1745 1292.5C1711.5 1254 1678 1232 1678 1232Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L2-TL3"
                  d="M1792.5 1367L1929.5 1316C1929.5 1316 1956.45 1378.56 1964 1446.5C1972.5 1523 1959.5 1582 1959.5 1582L1816 1557.5C1816 1557.5 1825.35 1512.5 1818.5 1459C1811.65 1405.5 1792.5 1367 1792.5 1367Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L2-PPM"
                  d="M1816 1557.5L1960 1582C1960 1582 1946.83 1661.5 1905.5 1732C1854.5 1819 1801.5 1856 1801.5 1856L1714.5 1739C1714.5 1739 1752.78 1706.5 1780.5 1657C1808.22 1607.5 1816 1557.5 1816 1557.5Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L2-AGILE"
                  d="M1656.5 1781C1656.5 1781 1666.5 1775.43 1686 1761.5C1706.5 1746.85 1714.5 1739.5 1714.5 1739.5L2206 2398.5C2206 2398.5 2173.92 2423.88 2136.5 2449C2100 2473.5 2062 2495 2062 2495L1656.5 1781Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L2-A"
                  d="M1467.5 1819.5C1467.5 1819.5 1519.15 1823.94 1566.5 1814C1616.5 1803.5 1656.5 1781 1656.5 1781L1729 1907C1729 1907 1675.5 1940 1597 1957C1518.5 1974 1455.5 1965 1455.5 1965L1467.5 1819.5Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L2-TL4"
                  d="M1294.5 1746.5C1294.5 1746.5 1327 1774.86 1372 1794.5C1419 1815.01 1467 1819.5 1467 1819.5L1455.5 1965C1455.5 1965 1387 1959.5 1318.5 1930.5C1244.44 1899.15 1199 1856.5 1199 1856.5L1294.5 1746.5Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L2-TL5"
                  d="M1033 1500H1179C1179 1500 1175.05 1563 1209.5 1636.5C1242.55 1707 1294 1746.5 1294 1746.5L1199 1856.5C1199 1856.5 1127.5 1806 1074 1691.5C1030.54 1598.48 1033 1500 1033 1500Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L2-ITSA"
                  d="M1088.5 1279L1221 1340.5C1221 1340.5 1202.88 1369.5 1190.5 1415C1176.9 1465 1179 1499.5 1179 1499.5H1033C1033 1499.5 1032.47 1444.62 1047 1386.5C1062 1326.5 1088.5 1279 1088.5 1279Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L2-TL6"
                  d="M1089 1278.5C1089 1278.5 1113.5 1229.5 1158.5 1181.5C1203.5 1133.5 1251.5 1104.5 1251.5 1104.5L1339 1222C1339 1222 1309 1236.5 1272 1274C1235 1311.5 1221 1341 1221 1341L1089 1278.5Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>

            <path id="L3-SOC"
                  d="M1021 793.5C1021 793.5 1083.5 749.445 1165.5 714.5C1246 680.194 1322.5 665 1322.5 665L1426 1039C1426 1039 1380 1045.99 1336 1062.5C1288 1080.51 1252 1104.5 1252 1104.5L1021 793.5Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L3-ISC"
                  d="M1322.5 665C1322.5 665 1395.5 647.571 1493.5 646.5C1585 645.5 1663 662 1663 662L1571 1038.5C1571 1038.5 1541 1033 1498 1033C1460 1033 1425.5 1039 1425.5 1039L1322.5 665Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L3-PT"
                  d="M1663 662C1663 662 1746.5 676.5 1837 715C1917 749.033 1992 802.5 1992 802.5L1763.5 1114.5C1763.5 1114.5 1725.94 1087.15 1666.5 1063.5C1620 1045 1571.5 1038.5 1571.5 1038.5L1663 662Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L3-DS"
                  d="M2079 683.5C2079 683.5 2123.22 715.825 2158 746C2199.5 782 2229.5 815 2229.5 815L1837 1177C1837 1177 1819.5 1158.5 1802 1144C1784.54 1129.54 1763.5 1114.5 1763.5 1114.5L2079 683.5Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L3-DA"
                  d="M2229.5 815C2229.5 815 2264 851 2295.5 892.5C2327 934 2353.5 977 2353.5 977L1891.5 1245C1891.5 1245 1878 1225 1866 1210C1853.75 1194.69 1837 1177 1837 1177L2229.5 815Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L3-DME"
                  d="M2353.5 977C2353.5 977 2376.5 1014.5 2394.5 1050.5C2412.5 1086.5 2429 1127.5 2429 1127.5L1929 1315.5C1929 1315.5 1921.5 1297.5 1911.5 1279.5C1901.5 1261.5 1891.5 1245 1891.5 1245L2353.5 977Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L3-S"
                  d="M1929 1315.5L2429 1127.5C2429 1127.5 2445 1166 2460 1216.5C2475 1267 2482.5 1310 2482.5 1310L1957.5 1405.5L1929 1315.5Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L3-H"
                  d="M1957.5 1405.5L2482.5 1310C2482.5 1310 2492 1358 2496.5 1405C2501 1452 2500.5 1500 2500.5 1500L1967 1488L1957.5 1405.5Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L3-T"
                  d="M1967 1488L2500.5 1500C2500.5 1500 2501 1548.5 2497 1587C2490.88 1645.94 2485.5 1673 2485.5 1673L1959.5 1582.5L1967 1488Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L3-PM"
                  d="M1959.5 1582L2132.5 1612.5C2132.5 1612.5 2123 1681.5 2087 1767C2070.75 1805.6 2039.83 1860.74 2010 1900C1961 1964.5 1912.5 2005 1912.5 2005L1801.5 1856C1801.5 1856 1825.5 1840 1868.5 1787C1884.32 1767.5 1913.34 1723.41 1932 1678C1953.57 1625.5 1959.5 1582 1959.5 1582Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L3-SD"
                  d="M1198.5 1856.5C1198.5 1856.5 1235.07 1886.82 1261.5 1901.5C1288.5 1916.5 1310.17 1928.13 1343.5 1940C1365.5 1947.83 1411.11 1961.74 1456 1965C1483.5 1967 1515.41 1968.7 1553 1964C1589 1959.5 1616.55 1954.36 1655 1940.5C1698 1925 1728.5 1907.5 1728.5 1907.5L1789 2016C1789 2016 1722 2053 1631 2071.5C1557.84 2086.37 1494 2085.5 1440 2079.5C1391.59 2074.12 1322.87 2058.89 1254.5 2027.5C1175 1991 1122.5 1944.5 1122.5 1944.5L1198.5 1856.5Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L3-SQAE"
                  d="M907.5 1569L1035.5 1548.5C1035.5 1548.5 1040.35 1586 1046 1609.5C1052.18 1635.2 1056.67 1649.47 1066.5 1674C1077.54 1701.56 1085.1 1716.61 1100.5 1742C1116.95 1769.11 1129 1784.5 1148.5 1807.5C1168 1830.5 1198.5 1856.5 1198.5 1856.5L1122.5 1944.5C1122.5 1944.5 1079.5 1909.5 1049.5 1873.5C1019.5 1837.5 1007.28 1821.67 985.5 1785C968.643 1756.62 960.255 1739.94 947.5 1709.5C936.547 1683.36 931.287 1668.25 923.5 1641C915.587 1613.3 907.5 1569 907.5 1569Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L3-DO"
                  d="M505 1391L1036 1449C1036 1449 1033.07 1479.74 1033 1499.5C1032.94 1518.66 1035.5 1548.5 1035.5 1548.5L508 1632.5C508 1632.5 499.5 1576.5 499 1507C498.5 1437.5 505 1391 505 1391Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L3-L3"
                  d="M904.608 1330.73L1053.5 1363C1053.5 1363 1049.97 1374.86 1047.5 1384.5C1045.11 1393.81 1042 1408.5 1042 1408.5L895 1380.16L904.608 1330.73Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L3-L2"
                  d="M894.709 1206L1084.58 1286.13C1084.58 1286.13 1077.95 1299.68 1074 1308.5C1069.94 1317.56 1064.1 1331.91 1064.1 1331.91L875 1253.58L894.709 1206Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L3-L1"
                  d="M892.286 1070.14L1127.5 1218.5C1127.5 1218.5 1118.77 1230.25 1113.5 1238C1108.17 1245.83 1100.38 1258.4 1100.38 1258.4L866.117 1112.02L892.286 1070.14Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L3-ITSM"
                  d="M949.438 883.609L1212.5 1132C1212.5 1132 1202.53 1139.97 1194.5 1147C1186.36 1154.13 1174.12 1165.78 1174.12 1165.78L911.441 925.076L949.438 883.609Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>

            <path id="L4-MD"
                  d="M1122.5 1944C1122.5 1944 1154 1972 1200 1999C1246 2026 1276.5 2038 1314 2051.5C1351.5 2065 1400 2075 1444 2080C1488 2085 1529.1 2085.44 1583 2079C1626.81 2073.77 1649 2068.5 1693.5 2055.5C1738 2042.5 1789 2016 1789 2016L1846 2114C1846 2114 1789 2145 1743 2160.5C1697 2176 1665.96 2185.26 1615 2193.5C1546.72 2204.54 1487.5 2204 1438 2200C1388.5 2196 1342 2187 1287 2170.5C1232 2154 1191 2134.5 1140 2106C1089 2077.5 1041.5 2037 1041.5 2037L1122.5 1944Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L4-MQAE"
                  d="M788.5 1588L907.5 1569C907.5 1569 916.5 1621.5 928.5 1658C940.5 1694.5 948.51 1715.07 966 1749.5C980.515 1778.07 989.789 1793.63 1008 1820C1027.34 1848 1040.5 1863 1062.5 1888C1084.5 1913 1122 1944 1122 1944L1041.5 2037C1041.5 2037 1003 2005.5 976 1976C949 1946.5 939.226 1934.98 918.5 1906.5C898.454 1878.95 888.079 1862.76 871.5 1833C853.521 1800.72 844.572 1781.86 831 1747.5C819.069 1717.29 814.5 1701 805 1668.5C795.5 1636 788.5 1588 788.5 1588Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>

            <path id="L5-SA"
                  d="M2133 1612.5L2340.5 1649C2340.5 1649 2328.5 1722 2301 1796.5C2273.5 1871 2234 1935.5 2234 1935.5L2058 1825C2058 1825 2084.5 1779.5 2104.5 1722C2124.5 1664.5 2133 1612.5 2133 1612.5Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L5-BA"
                  d="M2058 1825L2234 1936C2234 1936 2209.5 1977.5 2183.5 2011.5C2157.5 2045.5 2141 2063.5 2112 2095C2083 2126.5 2033.5 2166 2033.5 2166L1912.5 2004.5C1912.5 2004.5 1958.76 1964.81 1993 1922C2033 1872 2058 1825 2058 1825Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L5-JD"
                  d="M1041.5 2037.5C1041.5 2037.5 1076.5 2066.5 1113 2089.5C1149.5 2112.5 1165.42 2121.18 1201 2137.5C1242.55 2156.55 1270 2166 1311 2177.5C1352 2189 1390.5 2195 1423 2198.5C1455.5 2202 1494.36 2204.02 1540 2201.5C1585.85 2198.96 1616 2194 1656.5 2185.5C1697 2177 1719 2168.5 1758 2155C1797 2141.5 1846 2114 1846 2114L1918.5 2244C1918.5 2244 1859 2277.5 1816 2293C1773 2308.5 1746.5 2320 1698 2330.5C1649.5 2341 1608.5 2348.5 1561 2351.5C1513.5 2354.5 1476.68 2354.86 1423 2350C1358.69 2344.18 1303.5 2332.5 1260.5 2319.5C1217.5 2306.5 1172 2290 1134.5 2271.5C1097 2253 1089.31 2249.5 1041 2219.5C992.695 2189.5 945.5 2149 945.5 2149L1041.5 2037.5Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L5-JQAE"
                  d="M653.5 1609.5L788.5 1588C788.5 1588 795 1632.5 805 1668.5C815 1704.5 820.344 1721.06 833.5 1753.5C846.431 1785.39 855.5 1805 871.5 1833C887.5 1861 899.774 1881.24 921 1910C942.065 1938.55 955 1953 979.5 1979.5C1004 2006 1041 2037 1041 2037L945 2148C945 2148 907.5 2116.5 881.5 2088C855.5 2059.5 839.736 2042.23 816 2010.5C787.905 1972.94 773.547 1950.63 751 1909.5C729.078 1869.51 718.197 1846.13 702 1803.5C688.336 1767.53 684 1751 672.5 1709.5C661 1668 653.5 1609.5 653.5 1609.5Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>

            <path id="L6-SASEECT"
                  d="M934 674.5C934 674.5 1003.5 627 1054.5 603.5C1105.5 580 1128.5 568.5 1190 548C1251.5 527.5 1312 516.275 1342 511.5C1403.13 501.771 1460 499 1500 499C1540 499 1612 503.5 1661 512C1710 520.5 1750.86 529.118 1806.5 547C1863.94 565.463 1892.5 578 1949.5 605.5C2006.5 633 2079 683.5 2079 683.5L1992 802.5C1992 802.5 1937.5 763 1878 734.5C1818.5 706 1778 692.5 1756 685.5C1734 678.5 1678.73 663.637 1628 656C1577.86 648.451 1536.5 646.5 1498.5 646.5C1460.5 646.5 1419.13 648.771 1369 656.5C1319.47 664.136 1283.5 673.5 1244 685.5C1204.5 697.5 1180 708.145 1127.5 732C1075 755.855 1021 793.5 1021 793.5L934 674.5Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L6-TW"
                  d="M2340.5 1649L2485.5 1674C2485.5 1674 2475 1738.5 2458.5 1789C2442 1839.5 2434.5 1859.5 2419 1897C2403.5 1934.5 2375.5 1986.5 2362 2009C2348.5 2031.5 2315.5 2082.5 2299 2103C2282.5 2123.5 2271.5 2141 2222 2193C2172.5 2245 2121 2284.5 2121 2284.5L2033.5 2166C2033.5 2166 2074.5 2135 2116.5 2090C2158.5 2045 2158 2044.5 2177.5 2019C2197 1993.5 2215.5 1967.5 2234 1936C2252.5 1904.5 2271.04 1869.81 2289.5 1825C2304.6 1788.34 2311.91 1767.2 2322.5 1729C2331.05 1698.14 2340.5 1649 2340.5 1649Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L6-T1"
                  d="M945.5 2149C945.5 2149 989 2188 1044 2221.5C1099 2255 1108.5 2260 1154 2280.5C1199.5 2301 1247.5 2316.5 1282 2325.5C1316.5 2334.5 1370.05 2345.67 1427.5 2350.5C1481.01 2355 1521.5 2354 1565 2351C1608.5 2348 1646.5 2342 1689 2332.5C1731.5 2323 1753 2316.5 1807 2296.5C1861 2276.5 1918.5 2244 1918.5 2244L1991 2372.5C1991 2372.5 1921.5 2410.5 1859 2434.5C1796.5 2458.5 1744 2471.5 1713 2478C1682 2484.5 1613 2497 1551 2499.5C1489 2502 1459 2501 1405 2496.5C1351 2492 1284 2478.5 1241 2467C1198 2455.5 1131 2432.5 1084 2410.5C1037 2388.5 1011.5 2376 955 2339.5C898.5 2303 849.5 2260.5 849.5 2260.5L945.5 2149Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L6-T2"
                  d="M508 1633L653.5 1609.5C653.5 1609.5 660.296 1657.02 667 1687C673.76 1717.23 678.43 1734.03 688 1763.5C697.277 1792.06 703.198 1807.89 715 1835.5C726.841 1863.21 734.184 1878.49 748.5 1905C763.902 1933.52 773.381 1949.12 791.5 1976C808.352 2001 818.492 2014.6 837.5 2038C856.772 2061.73 868.149 2074.63 889.5 2096.5C910.054 2117.56 944.5 2148 944.5 2148L848 2259C848 2259 807.898 2223.86 784 2199.5C758.042 2173.04 744.274 2157.35 721 2128.5C698.638 2100.78 686.749 2084.64 667 2055C647.039 2025.04 636.63 2007.66 619.5 1976C602.67 1944.89 593.962 1927 580 1894.5C565.754 1861.34 558.607 1842.33 547.5 1808C536.842 1775.05 531.663 1756.27 524 1722.5C516.143 1687.87 508 1633 508 1633Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L6-AS"
                  d="M570.5 1129L709 1179C709 1179 696.098 1211.97 689 1233.5C682.307 1253.8 678.851 1265.3 673.5 1286C667.546 1309.03 664.771 1322.1 660.5 1345.5C656.141 1369.38 651.5 1407 651.5 1407L505 1391C505 1391 510.181 1348.8 515 1322C519.629 1296.26 522.66 1281.88 529 1256.5C535.202 1231.68 539.121 1217.84 547 1193.5C555.255 1167.99 570.5 1129 570.5 1129Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L6-ITIS"
                  d="M722 870.5L835.5 964C835.5 964 812.573 993.375 799 1013C785.413 1032.65 778.179 1043.95 766 1064.5C753.303 1085.92 746.604 1098.21 735.5 1120.5C724.317 1142.95 709 1179 709 1179L570.5 1129C570.5 1129 587.744 1086.57 600.5 1060.5C614.169 1032.56 622.606 1017.24 638.5 990.5C653.583 965.126 662.582 951.189 679.5 927C695.324 904.374 722 870.5 722 870.5Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
            <path id="L6-US"
                  d="M722 870.5C722 870.5 751.094 835.67 771 814.5C790.768 793.477 802.268 782.043 823.5 762.5C843.571 744.026 855.144 733.972 876.5 717C897.933 699.966 933 675.5 933 675.5L1020.5 794C1020.5 794 990.458 815 972 829.5C952.497 844.821 941.778 853.736 923.5 870.5C903.963 888.418 893.532 899.068 875.5 918.5C859.494 935.748 836 964 836 964L722 870.5Z"
                  fill="#C4C4C4" fill-opacity="0.01" v-b-modal="'my-modal'"/>
          </g>
        </svg>
      </div>
      <div class="img-layer">
        <img :src="require(`../assets/Chudesnyi_774_krug_c_telekommunikatsiami_1.svg`)" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-select/dist/vue-select.css';
import vSelect from 'vue-select'
import ModalContent from "./ModalContent";
import Vue from "vue";
import Multiselect from 'vue-multiselect'
import api from '@/services/api'
import textContent from '@/services/textContent'

// register globally
Vue.component('multiselect', Multiselect)
Vue.component('v-select', vSelect)
Vue.component('modal-content', ModalContent)
export default {
  name: "MainWrapper",
  components: { Multiselect, ModalContent},
  data() {
    return {
      allTextContent: '',
      modalContent: '',
      instituteList: [],
      directionList: [],
      profileList: [],
      selectInst: [],
      selectDirection: [],
      selectProfile: [],
      allDirections: [],
      allProfs: [],

      title: '',
    }
  },
  watch: {
    // selectInst: function (selectDir) {
    //   console.log('WATCH INST', selectDir)
    //   this.changeDirsList()
    // },
    // selectDirection: function (selectProf) {
    //   console.log('WATCH DIR', selectProf)
    //   this.changeProfList()
    // }
  },
  methods: {
    clearModalContent() {
      this.modalContent = ''
    },
    findSectors() {
      const paths = document.querySelectorAll("path, circle")
      api.getSectorsFromApi(this.selectInst, this.selectDirection, this.selectProfile).then(data => {
        paths.forEach((item) => {
          document.getElementById(item.id).setAttribute("style", "fill-opacity: 0.3; pointer-events: none;")
        })
        if (data.sectors === null) {
          paths.forEach((item) => {
            document.getElementById(item.id).setAttribute("style", "fill-opacity: 0.3; pointer-events: none;")
          })
        }
        else {
          data.sectors.forEach((item) => {
            if (document.getElementById(item.coords) != null) {
              document.getElementById(item.coords).setAttribute("style", "stroke: black; stroke-width: 3px")
            }
          })
        }
      })
    },
    // async getSectors() {
    //     return await axios.request({
    //         url: 'v1/sector',
    //         method: 'GET',
    //     }).then(resp => {
    //       this.$store.dispatch('fetchSectors', resp.data.sectors)
    //       console.log('respSec', resp.data.sectors);
    //         return resp.data
    //     }).catch(err => {
    //         return err
    //     })
    // },
    getAllDataFromApi() {
      // get institutes
      api.getInstitutesFromApi().then(data => {
        this.instituteList = (data === null) ? [] : data
      }).catch(err => {
        alert('Ошибка', err)
        console.log('err', err)
      })

      // get directions
      api.getDirectionsFromApi().then(data => {
        this.directionList = (data === null) ? [] : data
        this.allDirections = (data === null) ? [] : data
      }).catch(err => {
        alert('Ошибка', err)
        console.log('err', err)
      })

      // get profiles
      api.getProfilesFromApi().then(data => {
        this.profileList = (data === null) ? [] : data
        this.allProfs = (data === null) ? [] : data
      }).catch(err => {
        alert('Ошибка', err)
        console.log('err', err)
      })
    },
    setTextContent() {
      Object.keys(this.allTextContent).forEach((id) => {
        console.log('this.allTextContent', this.allTextContent[id]);
        document.getElementById(id).addEventListener('click', () => {
          const selectedSector = this.$store.state.sectorList.find(sector => sector.coords === id);
          this.title = this.allTextContent[id].name
          this.$store.dispatch('changeselectedSector', selectedSector)
          this.$store.dispatch('changeMarkdown', selectedSector?.description)
          this.modalContent = selectedSector?.description
        })
      })
    },
    updateSectorDescription() {
      const selectedSector = this.$store.state.sectorList.find(sector => 
        sector.coords === this.$store.state.selectedSector.coords
      )
      api.updateSectorDescription(selectedSector.id, this.$store.state.markdown);
    },
    changeDirsList() {
      if (this.selectInst !== null ) {
        if (this.selectInst.directions !== null) {
          this.directionList = this.selectInst.directions
        }
        else {
          this.directionList = []
        }
      }
      else {
        this.directionList = this.allDirections
      }
    },
    changeProfList() {
      if (this.selectDirection !== null ) {
        if (this.selectDirection.profiles !== null) {
          this.profileList = this.selectDirection.profiles
        }
        else {
          this.profileList = []
        }
      }
      else {
        this.profileList = this.allProfs
      }
    }
  },
  mounted() {
    this.getAllDataFromApi()
    api.getSectorsList()
    this.allTextContent = textContent.textContent
    this.setTextContent()
    this.$root.$emit('modalContent', this.modalContent);
    
    // get Ids
    // const ids = Array.from(new Set(Array.from(document.all).map(i => i.id).filter(i => i != ""))).sort()
    // const obj = {}
    // ids.forEach((id) => {
    //   obj[id] = {
    //     'id': id,
    //     'name': 'todo name'
    //   }
    // })
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>

.img-layer, .svg-layer {
  position: absolute;
  left: calc((100% - 900px)/2);
}
.modal__title{
  text-align: left;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
}
.modal__content{
  text-align: left;
  font-size: 14px;
  margin-bottom: 15px;
  white-space: pre-wrap;
}



.svg-layer {
  position: absolute;
  z-index: 999;
}

.selects-row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto 15px;
  max-width: 1200px;
}
.selects-row__item{
  margin-right: 30px;
  width: 33.333%;
  z-index: 1000;
}
@media (max-width: 768px) {
  /* Стили для устройств с шириной viewport, находящейся в диапазоне 768px - 991px */
  .img-layer img {
    margin: 0 auto;
    width: 600px;
  }
  .svg-layer__circle {
    margin: 0 auto;
    width: 600px;
    height: 600px;
  }
  
}



// /* Устройства со средним экраном (ноутбуки и компьютеры, 992px и выше) */
// @media (min-width: 992px){
//   /* Стили для устройств с шириной viewport, находящейся в диапазоне 992px - 1199px */
//   .img-layer img {
//     width: 900px;
//   }
//   .svg-layer__circle {
//     width: 900px;
//     height: 900px;
//   }
//   .svg-layer {
//     left: 15%;
//   }
//   .img-layer img {
//     left: 15%;
//   }
// }

/* Устройства с большим экраном (компьютеры, 1200px и выше) */
// @media (min-width: 1200px) and  (min-height: 1000px) {
//   .img-layer img {
//     width: 1000px;
//   }
//   .svg-layer__circle {
//     width: 1000px;
//     height: 1000px;
//   }
// }

</style>
