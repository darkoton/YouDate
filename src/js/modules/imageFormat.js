// Проверка поддержки формата изображений
function testImageFormat(format, data, callback) {
  let img = new Image();
  img.onload = img.onerror = () => {
    callback(img.height === 2);
  };
  img.src = data;
}

// Проверка AVIF
function isAvif() {
  testImageFormat(
    "avif",
    "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAG1pZjFhdmlmAAAAAGF2MDFtZGF0EgAKBQAACQAAAD1iGQ==",
    (support) => {
      let className = support ? "avif" : "no-avif";
      document.documentElement.classList.add(className);
    }
  );
}

// Проверка WebP
function isWebp() {
  testImageFormat(
    "webp",
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA",
    (support) => {
      let className = support ? "webp" : "no-webp";
      document.documentElement.classList.add(className);
    }
  );
}

