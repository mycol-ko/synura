// @ts-nocheck

var SITE = {
  "siteKey": "2cpu",
  "displayName": "2CPU",
  "browserHomeUrl": "https://www.2cpu.co.kr",
  "browserCookieAuth": true,
  "minimumHomeBoards": 10,
  "defaultCacheTtlMs": 600000,
  "showCacheSnackbarByDefault": true,
  "enableCacheSettings": true,
  "enableBoardReorder": true,
  "enableBoardDelete": true,
  "boardSettingsMenuLabel": "게시판",
  "boardSettingsTitle": "게시판 설정",
  "dynamicBoardGroupLabel": "게시판",
  "preferConfiguredDynamicBoardTitle": true,
  "boardSettingsLargeThreshold": 256,
  "boardSettingsPageSize": 96,
  "boardAddMode": "url_title",
  "hasFullBoardCatalog": false,
  "supportsBoardCatalogSync": false,
  "defaultVisibleBoardIds": [],
  "defaultShowMediaBoardIds": [],
  "defaultGalleryModeBoardIds": [],
  "hostAliases": [
    "2cpu.co.kr"
  ],
  "challengeMarkers": [],
  "titleSuffixes": [
    " : 2CPU",
    " - 2CPU",
    " > 2CPU"
  ],
  "linkAllowPatterns": [
    "^https://www\\.2cpu\\.co\\.kr/[^/]+(/\\d+)?",
    "^https://www\\.2cpu\\.co\\.kr/bbs/board\\.php\\?bo_table=[^&]+(&wr_id=\\d+)?"
  ],
  "listBoardQueryParam": "",
  "hotThreshold": 3000,
  "coldThreshold": 20,
  "commentHotThreshold": 5,
  "commentColdThreshold": 3,
  "boards": [
    { "id": "freeboard_2011", "title": "자유게시판", "hotThreshold": 5000, "coldThreshold": 30 },
    { "id": "oneline", "title": "한줄" },
    { "id": "QnA", "title": "QnA" },
    { "id": "job", "title": "Job" },
    { "id": "column", "title": "Life" },
    { "id": "cloud", "title": "업체홍보" },
    { "id": "hojak", "title": "DIY" },
    { "id": "unbox", "title": "언박싱" },
    { "id": "nas", "title": "NAS" },
    { "id": "deep", "title": "딥러닝" },
    { "id": "vm", "title": "가상화" },
    { "id": "hardware_2014", "title": "하드웨어" },
    { "id": "network", "title": "네트웍" },
    { "id": "4raid", "title": "RAID" },
    { "id": "lec", "title": "강좌" },
    { "id": "PDS", "title": "자료" },
    { "id": "bmt", "title": "BMT" },
    { "id": "ha", "title": "훈훈" },
    { "id": "sell", "title": "판매" },
    { "id": "buy", "title": "구매" },
    { "id": "quot", "title": "견적" },
    { "id": "hongik", "title": "해외" }
  ],
  "selectors": {
    "boardTitle": [
      ".board_title",
      "h3.board_name",
      "title"
    ],
    "listRows": [
      ".table-hover tr:not(.visible-xs):not(.success):not(.is_notice)"
    ],
    "listLink": [
      "td:nth-child(2) a[href*='wr_id=']",
      "td:nth-child(2) a[href]"
    ],
    "listTitle": [
      "td:nth-child(2) a:first-child",
      "td:nth-child(2) a"
    ],
    "listCommentCount": [
      "td:nth-child(2) a span small",
      "td:nth-child(2) small"
    ],
    "listAuthor": [
      "td:nth-child(3)"
    ],
    "listDate": [
      "td:nth-child(4)"
    ],
    "listViewCount": [
      "td:nth-child(5)"
    ],
    "listLikeCount": [
      "td:nth-child(6)"
    ],
    "postTitle": [
      "#v_title",
      "#bo_v_title",
      ".bo_v_tit",
      "h1"
    ],
    "postAuthor": [
      ".sideview",
      ".sv_member"
    ],
    "postDate": [
      ".bo_v_info time",
      ".bo_v_info",
      "#writeDate"
    ],
    "postViewCount": [
      ".bo_v_info .hit",
      "#writeHit"
    ],
    "postLikeCount": [
      ".bo_v_info .good",
      "#writeGood"
    ],
    "postContent": [
      "#v_content",
      "#bo_v_con"
    ],
    "commentRows": [
      "#comment_view .comment_row",
      ".cmt_row",
      "#bo_vc .bo_vc_w"
    ],
    "commentAuthor": [
      ".comment_author",
      ".sv_member"
    ],
    "commentContent": [
      ".comment_view",
      ".cmt_contents"
    ],
    "commentDate": [
      ".comment_time",
      ".bo_vc_info time"
    ],
    "commentLevel": []
  },
  "commentLevelAttrs": [
    "data-depth",
    "depth",
    "class"
  ],
  "useRawPostParse": true,
  "useRawPostParseInEmulator": true
};

SITE.matchBoard = function (urlInfo) {
    var parts = pathSegments(urlInfo.path);
    if (parts.length >= 3 && parts[0] === "bbs" && parts[1] === "board.php") {
        var bo_table = queryParam(urlInfo.query, "bo_table");
        if (bo_table) {
            return {
                board: ensureBoard(bo_table, SITE.buildBoardUrlFromId(bo_table), bo_table),
                page: queryInt(urlInfo.query, "page", 1)
            };
        }
    }
    if (parts.length === 1 && parts[0] && parts[0] !== "bbs" && parts[0] !== "js" && parts[0] !== "css" && parts[0] !== "img") {
        return {
            board: ensureBoard(parts[0], SITE.buildBoardUrlFromId(parts[0]), parts[0]),
            page: queryInt(urlInfo.query, "page", 1)
        };
    }
    return null;
};

SITE.matchPost = function (urlInfo) {
    var parts = pathSegments(urlInfo.path);
    if (parts.length >= 3 && parts[0] === "bbs" && parts[1] === "board.php") {
        var bo_table = queryParam(urlInfo.query, "bo_table");
        var wr_id = queryParam(urlInfo.query, "wr_id");
        if (bo_table && wr_id) {
            return {
                board: ensureBoard(bo_table, SITE.buildBoardUrlFromId(bo_table), bo_table),
                postId: wr_id
            };
        }
    }
    if (parts.length >= 2 && parts[0] && parts[1] && /^\\d+$/.test(parts[1])) {
        return {
            board: ensureBoard(parts[0], SITE.buildBoardUrlFromId(parts[0]), parts[0]),
            postId: parts[1]
        };
    }
    return null;
};

SITE.buildNextPageUrl = function (match, currentUrl, nextPage) {
    return setPageParam(currentUrl, "page", nextPage);
};

SITE.buildPostFetchUrls = function (match, currentUrl) {
    var boardId = match && match.board ? match.board.id : "";
    var postId = match ? match.postId : "";
    var canonical = "https://" + SYNURA.domain + "/" + encodeURIComponent(boardId) + "/" + encodeURIComponent(postId);
    var oldUrl = "https://" + SYNURA.domain + "/bbs/board.php?bo_table=" + encodeURIComponent(boardId) + "&wr_id=" + encodeURIComponent(postId);
    return [canonical, oldUrl, currentUrl];
};

SITE.buildBoardUrlFromId = function (boardId) {
    return "https://" + SYNURA.domain + "/" + encodeURIComponent(boardId);
};

SITE.prepareBoardContext = function (context, items, match, url) {
    return context;
};

var SYNURA = {
    domain: "www.2cpu.co.kr",
    name: "2cpu",
    description: "2cpu parser",
    version: 0.1,
    api: 0,
    license: "Apache-2.0",
    bypass: "chrome/android",
    locale: "ko_KR",
    deeplink: true,
    icon: "https://www.2cpu.co.kr/img/favicon.ico",
    main: null
};
