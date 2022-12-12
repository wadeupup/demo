function demo() {
  const allPath = window.location.href;
  if (allPath.indexOf("?") > -1) {
    const pathArr = allPath.split("?");
    const search = window.location.search.split("?")[1];
    const searchArr = search.split("&");
    const langIndex = searchArr.findIndex(
      (lang) => lang.indexOf("lang=") > -1
    );
    if (langIndex > -1) {
      const oldLang = searchArr[langIndex];
      const newLang = `lang=${你的语言}`;
      if (oldLang !== newLang) {
        searchArr[langIndex] = newLang;
        // 最后跳转
        window.location.href = pathArr[0] + "?" + searchArr.join("");
        window.reload();
      }
    }
  }
}