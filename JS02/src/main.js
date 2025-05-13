import { getRandomActivity } from './activity.js';

/**
 * Обновляет активность на странице
 * @returns {Promise<void>}
 */
async function updateActivity() {
    try {
        const activity = await getRandomActivity();
        document.getElementById('activity').textContent = activity;
    } catch (error) {
        document.getElementById('activity').textContent = 'К сожалению, произошла ошибка';
    }
}

// Инициализация
updateActivity();

// Обновление каждую минуту
setInterval(updateActivity, 60000);
