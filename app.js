// search.js
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('soft-input');
    if (!input) return;

    // مدت زمان transition باید با CSS هماهنگ باشد (در این مثال 300ms)
    const TRANSITION_PROP = 'opacity';

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = input.value.trim();
            if (!query) return; // اگر خالی بود هیچ کاری نکن

            // باز کردن در تب جدید
            const url = 'https://www.google.com/search?q=' + encodeURIComponent(query);
            const newWin = window.open(url, '_blank');
            if (newWin) newWin.opener = null;

            // انیمیشن محو شدن متن داخل کادر
            // 1) کلاس fade-out را اضافه کن تا opacity به 0 برود
            input.classList.add('fade-out');

            // 2) وقتی transition تمام شد، مقدار را پاک کن و کلاس را بردار تا بازگردد به حالت اولیه
            const onTransitionEnd = (event) => {
                // فقط به تغییر opacity واکنش بده (در صورت وجود transition های دیگر)
                if (event.propertyName && event.propertyName !== TRANSITION_PROP) return;

                // پاک کردن متن
                input.value = '';

                // فورس ریفلو برای اطمینان از اجرای transition بازگشت
                // (بدون این ممکن است مرورگر تغییر کلاس را به عنوان یک تغییر همزمان ببیند)
                void input.offsetWidth;

                // حذف کلاس fade-out تا input دوباره با transition به opacity:1 برگردد
                input.classList.remove('fade-out');

                // پاک کردن listener (یکبار مصرف)
                input.removeEventListener('transitionend', onTransitionEnd);
            };

            // اضافه کردن listener (یکبار مصرف توسط remove در handler)
            input.addEventListener('transitionend', onTransitionEnd);
        }
    });
});
