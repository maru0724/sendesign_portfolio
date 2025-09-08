// HTMLの要素を取得
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalImgContainer = document.getElementById('modal-img-container');
const modalTools = document.getElementById('modal-tools');
const modalPoints = document.getElementById('modal-points');
const modalLink = document.getElementById('modal-link');
const closeModalBtn = document.querySelector('.close-btn');

const worksItems = document.querySelectorAll('.works__item');

function openModalFrom(el) {
  const {
    modalTitle: title,
    modalImage: image,
    modalImage2: image2,
    modalTools: tools,
    modalPoints: points,
    modalLink: link,
    hasLink
  } = el.dataset;

  // 内容反映
  modalTitle.textContent = title || '';
  modalImage.src = image || '';
  modalImage.alt = title ? `${title} の詳細画像` : '作品画像';
  modalTools.textContent = tools || '';
  modalPoints.textContent = points || '';

  // 2枚目の画像の生成/削除
  // 既存があれば除去
  const oldSecond = document.getElementById('modal-image2');
  if (oldSecond) oldSecond.remove();
  modalImgContainer.classList.remove('has-two');

  if (image2) {
    const second = document.createElement('img');
    second.id = 'modal-image2';
    second.src = image2;
    second.alt = title ? `${title} の追加画像` : '作品画像2';
    modalImgContainer.appendChild(second);
    modalImgContainer.classList.add('has-two');
  }

  // リンクの有無制御
  if (hasLink === 'false' || !link) {
    modalLink.style.display = 'none';
    modalLink.removeAttribute('href');
  } else {
    modalLink.style.display = 'inline-flex';
    modalLink.href = link;
    modalLink.target = '_blank';
    modalLink.rel = 'noopener noreferrer';
  }

  // 表示＆スクロール固定
  modal.classList.add('is-active');
  document.body.style.overflow = 'hidden';

  // フォーカスをモーダルに
  modal.setAttribute('tabindex', '-1');
  modal.focus();
}

// 各作品にクリックイベント
worksItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    openModalFrom(item);
  });
});

// 閉じる処理
function closeModal() {
  modal.classList.remove('is-active');
  document.body.style.overflow = '';
  modal.removeAttribute('tabindex');
}

closeModalBtn.addEventListener('click', closeModal);

// モーダル外クリックで閉じる
window.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Escで閉じる
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('is-active')) {
    closeModal();
  }
});
