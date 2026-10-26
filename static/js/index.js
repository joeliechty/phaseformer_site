// Push-T comparison viewer: each button swaps the GIF shown under "Compare with:".
document.addEventListener('DOMContentLoaded', function () {
  var gif = document.getElementById('compare-gif');
  var label = document.getElementById('compare-label');
  var loading = document.getElementById('compare-loading');
  var buttons = document.querySelectorAll('button[data-gif]');
  if (!gif) return;

  gif.addEventListener('load', function () { loading.hidden = true; });
  gif.addEventListener('error', function () {
    loading.textContent = 'could not load this GIF';
  });

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      if (button.classList.contains('is-link')) return;
      buttons.forEach(function (other) {
        other.classList.remove('is-link');
        other.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('is-link');
      button.setAttribute('aria-pressed', 'true');

      var name = button.textContent.trim();
      label.textContent = name;
      loading.textContent = 'loading…';
      loading.hidden = false;
      gif.alt = 'Push-T rollouts of ' + name +
        ': best, median and worst episode for each of 10 policy seeds.';
      gif.src = button.dataset.gif;
    });
  });
});
