document.querySelectorAll('[data-tabs]').forEach(parent => {
  const buttons = parent.querySelectorAll('[data-tab-btn]');
  const results = parent.querySelectorAll('[data-tab]');

  buttons.forEach(button => {
    const tabName = button.dataset.tabBtn;

    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('tab-active');

      results.forEach(block => {
        if (block.dataset.tab === tabName) {
          block.classList.add('active');
        } else {
          block.classList.remove('active');
        }
      });
    });
  });
});
