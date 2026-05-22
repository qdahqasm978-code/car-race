// إعداد الكانفس
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// تحميل الصور
const carImg = new Image();
carImg.src = "images/car2.png";   // سيارتك الأساسية

const roadImg = new Image();
roadImg.src = "images/road.png"; // الحلبة

const car32Img = new Image();
car32Img.src = "images/car32.png"; // سيارة الخصم

// مواقع السيارات
let carX = canvas.width / 2 - 25;
let carY = canvas.height - 100;

let car32X = canvas.width / 2 - 25;
let car32Y = 50;

// حالة اللعبة
let gameOver = false;
let score = 0; // عداد النقاط

// زر إعادة التشغيل
const restartBtn = document.getElementById("restartBtn");

// رسم اللعبة
function drawGame() {
  if (gameOver) return; // توقف عند انتهاء اللعبة

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // رسم الطريق
  ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);

  // رسم السيارة الأساسية
  ctx.drawImage(carImg, carX, carY, 50, 100);

  // رسم سيارة الخصم
  ctx.drawImage(car32Img, car32X, car32Y, 50, 100);

  // حركة سيارة الخصم للأسفل
  car32Y += 3;
  if (car32Y > canvas.height) {
    car32Y = -100;
    car32X = Math.random() * (canvas.width - 50);
    score++; // زيادة النقاط عند تجنب السيارة
  }

  // عرض النقاط
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  // التحقق من التصادم
  if (
    carX < car32X + 15 &&
    carX + 50 > car32X &&
    carY < car32Y + 50 &&
    carY + 50 > car32Y
  ) {
    gameOver = true;
    alert("💥 Game Over! \nYour Score: " + score);
    restartBtn.style.display = "block"; // إظهار زر إعادة التشغيل
  }

  requestAnimationFrame(drawGame);
}

// التحكم بالسيارة الأساسية
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && carX > 0) {
    carX -= 10;
  } else if (e.key === "ArrowRight" && carX < canvas.width - 50) {
    carX += 10;
  }
});

// إعادة التشغيل
restartBtn.addEventListener("click", () => {
  // إعادة المواقع
  carX = canvas.width / 2 - 25;
  carY = canvas.height - 100;
  car32X = canvas.width / 2 - 25;
  car32Y = 50;
  score = 0; // إعادة النقاط
  gameOver = false;

  restartBtn.style.display = "none"; // إخفاء الزر
  drawGame(); // تشغيل اللعبة من جديد
});

// تشغيل اللعبة بعد تحميل الصور
roadImg.onload = () => {
  drawGame();
};


