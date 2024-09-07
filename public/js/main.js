let stat = document.querySelector('#stats-tab');
let about = document.querySelector('#about-tab');
let faq = document.querySelector('#faq-tab');

stat.addEventListener('click', showStat);
about.addEventListener('click', showAbout);
faq.addEventListener('click', showFaq);

function showStat() {
  document.querySelector('#stats').classList.remove('hidden');
  document.querySelector('#about').classList.add('hidden');
  document.querySelector('#faq').classList.add('hidden');
}

function showAbout() {
  document.querySelector('#about').classList.remove('hidden');
  document.querySelector('#stats').classList.add('hidden');
  document.querySelector('#faq').classList.add('hidden');
}

function showFaq() {
  document.querySelector('#faq').classList.remove('hidden');
  document.querySelector('#about').classList.add('hidden');
  document.querySelector('#stats').classList.add('hidden');
}

const storedTab = localStorage.getItem('selectedTab');

if (storedTab) {
  // Activate the stored tab based on localStorage
  document.getElementById(storedTab).click();
} else {
  // Default to the 'stats' tab if no tab is stored
  stat.click();
}

// Add click events for saving selected tab in localStorage
stat.addEventListener('click', function() {
  localStorage.setItem('selectedTab', 'stats-tab');
});
about.addEventListener('click', function() {
  localStorage.setItem('selectedTab', 'about-tab');
});
faq.addEventListener('click', function() {
  localStorage.setItem('selectedTab', 'faq-tab');
});
