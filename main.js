// عندما اضع مؤشر الماوس على ايقونة النقاط ايلبس يتم تغيير لون خلفية الاب
const iconEllipsis = document.querySelectorAll('.icon-ellipsis');
iconEllipsis.forEach(icon => {
    icon.addEventListener('mouseover', function() {
        const optionCard = icon.parentElement;
        const cardDetails = optionCard.parentElement;

        cardDetails.style.backgroundColor = 'hsl(235, 46%, 20%)';
    });
    
    icon.addEventListener('mouseout', function() {
        const optionCard = icon.parentElement;
        const cardDetails = optionCard.parentElement;
        cardDetails.style.backgroundColor = '';
    });
});

// الكود الخاص بتغيير المحتوى عند الضغط على عناوين الجزء الايسر للملف الشخصي
import appData from './data.json' with { type: 'json' };

const btnDaily = document.getElementById('btnDaily');
const btnWeekly = document.getElementById('btnWeekly');
const btnMonthly = document.getElementById('btnMonthly');

const titleHrs = document.querySelectorAll('.titleHrs');
const periodButtons = document.querySelectorAll('.date-details h4');

// دالة موحدة لتحديث جميع بطاقات النشاط بناءً على الفترة الزمنية
function updateContent(timeframe) {
    // 1. إدارة الكلاس النشط
    periodButtons.forEach(btn => btn.classList.remove('active'));
    
    let currentActiveButton;
    let previousPeriodText = '';

    if (timeframe === 'daily') {
        currentActiveButton = btnDaily;
        previousPeriodText = 'Yesterday';
    } else if (timeframe === 'weekly') {
        currentActiveButton = btnWeekly;
        previousPeriodText = 'Last Week';
    } else if (timeframe === 'monthly') {
        currentActiveButton = btnMonthly;
        previousPeriodText = 'Last Month';
    }
    
    // إضافة الكلاس النشط للزر الحالي
    if (currentActiveButton) {
        currentActiveButton.classList.add('active');
    }

    // 2. تحديث محتوى البطاقات
    appData.forEach((activity, index) => {
        const currentHrsElement = titleHrs[index];
        const previousHrsElement = currentHrsElement.nextElementSibling; 

        currentHrsElement.textContent = `${activity.timeframes[timeframe].current}hrs`;
        previousHrsElement.textContent = `${previousPeriodText} - ${activity.timeframes[timeframe].previous}hrs`;
    });
}

// 3. استدعاء الدالة عند النقر على الأزرار
btnDaily.addEventListener('click', () => updateContent('daily'));
btnWeekly.addEventListener('click', () => updateContent('weekly'));
btnMonthly.addEventListener('click', () => updateContent('monthly'));

// 4. خطوة البدء: استدعاء الدالة لتحميل المحتوى الافتراضي وإضافة الكلاس 'active'
updateContent('weekly');