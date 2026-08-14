module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat', // Новая фича
                'fix', // Багфикс
                'docs', // Документация
                'style', // Форматирование (не влияет на код)
                'refactor', // Рефакторинг
                'test', // Тесты
                'chore', // Обновление зависимостей, конфигов
                'perf', // Улучшение производительности
                'ci', // CI/CD
                'build', // Система сборки
            ],
        ],
        'subject-case': [0],
    },
};
