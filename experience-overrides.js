/* Skill wording correction after the experience script renders. */
(() => {
  const rename = () => {
    [...document.querySelectorAll('.skill-box-title')].forEach((title) => {
      if (title.textContent.trim() === 'Currently Deepening') title.textContent = 'Engineering Focus';
    });
  };
  rename();
  setTimeout(rename, 50);
})();
