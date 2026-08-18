/* Small copy corrections layered after the experience script renders. */
(() => {
  const apply = () => {
    [...document.querySelectorAll('.skill-box')].forEach((box) => {
      const title = box.querySelector('.skill-box-title');
      if (!title) return;
      if (title.textContent.trim() === 'Currently Deepening' || title.textContent.trim() === 'Engineering Focus') {
        title.textContent = 'Engineering Focus';
        const tags = box.querySelector('.tech-tags');
        if (tags) {
          tags.innerHTML = '<span class="tag">Backend Systems</span><span class="tag">Distributed Systems</span><span class="tag">System Design</span><span class="tag">AI Systems</span>';
        }
      }
    });
  };
  apply();
  setTimeout(apply, 50);
})();
