// index.html에서 분리한 전체 JavaScript
// 로고/텍스트 클릭 시 홈으로 이동
document.getElementById('logoHome').onclick = function () {
  showSection('hero');
};
document.getElementById('logoImg').onclick = function () {
  showSection('hero');
};
document.getElementById('logoText').onclick = function () {
  showSection('hero');
};
// 모바일 메뉴 토글
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  mobileNav.style.display =
    mobileNav.style.display === 'flex' ? 'none' : 'flex';
});
hamburger.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') hamburger.click();
});
// 모바일 About 드롭다운 토글
const mobileAboutToggle = document.getElementById('mobileAboutToggle');
const mobileAboutDropdown = document.getElementById('mobileAboutDropdown');
let mobileAboutOpen = false;
mobileAboutToggle.onclick = function (e) {
  e.stopPropagation();
  mobileAboutOpen = !mobileAboutOpen;
  if (mobileAboutOpen) {
    mobileAboutDropdown.style.display = 'flex';
    mobileAboutToggle.parentElement.classList.add('dropdown-open');
  } else {
    mobileAboutDropdown.style.display = 'none';
    mobileAboutToggle.parentElement.classList.remove('dropdown-open');
  }
};
// 모바일 메뉴 바깥 클릭 시 드롭다운 닫기
document.addEventListener('click', function (e) {
  if (
    mobileAboutOpen &&
    !mobileAboutToggle.contains(e.target) &&
    !mobileAboutDropdown.contains(e.target)
  ) {
    mobileAboutDropdown.style.display = 'none';
    mobileAboutToggle.parentElement.classList.remove('dropdown-open');
    mobileAboutOpen = false;
  }
});
// 모바일 메뉴 클릭 시 닫힘 + 섹션 이동
document.querySelectorAll('.mobile-link').forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    mobileNav.style.display = 'none';
    showSection(this.dataset.section);
    document
      .querySelectorAll('nav a')
      .forEach((x) => x.classList.remove('active'));
    // 모바일 드롭다운 닫기
    if (mobileAboutOpen) {
      mobileAboutDropdown.style.display = 'none';
      mobileAboutToggle.parentElement.classList.remove('dropdown-open');
      mobileAboutOpen = false;
    }
  });
});
// 데스크탑 네비게이션 클릭 시(기존대로)
document.querySelectorAll('.menu-link:not(.mobile-link)').forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const sec = this.dataset.section;
    if (sec) showSection(sec);
    document
      .querySelectorAll('nav a')
      .forEach((x) => x.classList.remove('active'));
    this.classList.add('active');
    mobileNav.style.display = 'none';
  });
});
// 비전/전략 카드 클릭 전환
const visionCards = document.querySelectorAll('.vision-card');
visionCards.forEach((card) => {
  card.addEventListener('click', function () {
    visionCards.forEach((x) => x.classList.remove('active'));
    document
      .querySelectorAll('.vision-content')
      .forEach((x) => x.classList.remove('active'));
    card.classList.add('active');
    document.getElementById('vc' + card.dataset.num).classList.add('active');
  });
});
// 섹션 전환 (부드러운 애니메이션, 시간 단축)
function showSection(id) {
  const currentSection = document.querySelector('main > section.active');
  const targetSection = document.getElementById(id);
  if (currentSection && targetSection && currentSection !== targetSection) {
    currentSection.style.opacity = '0';
    currentSection.style.transform = 'translateY(20px)';
    setTimeout(() => {
      currentSection.classList.remove('active');
      targetSection.classList.add('active');
      setTimeout(() => {
        targetSection.style.opacity = '1';
        targetSection.style.transform = 'translateY(0)';
      }, 30);
    }, 140);
  } else if (targetSection && !currentSection) {
    targetSection.classList.add('active');
    targetSection.style.opacity = '1';
    targetSection.style.transform = 'translateY(0)';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
// 최초 진입시 Home 보이기
showSection('hero');
