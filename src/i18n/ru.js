import {passport_series} from "@/utils/i18n-validators";

export default {
    "empty-data": 'Данные для отображения отсутствуют',
    "validations": {
        "email": "Некорректный email",
        "required": 'Поле обязательно для заполнения',
        "numeric": 'Поле должно содержать только числа',
        'minLength': 'Длина поля должна быть равна {min} символов',
        'inn': 'Длина символов должна равняться 12',
        'ogrn': 'Длина символов должна равняться 13',
        'passport_series': 'Длина символов должна равняться 4',
        'passport_numbers': 'Длина символов должна равняться 6',
        'checking_account': 'Длина символов расчетного счета равна 20',
        'bik': 'Длина символов БИК равна 9',
    },
    headers: {
        'tariff-create': 'Создание тарифа',
    },
    modals: {
        'tariff-destroy': {
            header: 'Удалить тариф',
            text: 'Вы уверены, что хотите удалить тариф? Это действие будет невозможно отменить',
        }
    },
    "card-names": {
        "basic-registration-information": 'Основные регистрационные сведения',
        "contact-data": "Контактные данные",
        "role": 'Роль',
        "language": 'Язык',
        "tariff-name": 'Наименование тарифа',
        "name": "Название",
        "type-tariff": 'Тип тарифа',
        "tariff-cost": 'Стоимость тарифа / платежа',
        "tariff-cost-description": 'Описание тарифа / платежа',
    },
    "placeholders": {
        "roles": 'Роли',
        "type-tariff": 'Тип тарифа',
    },
    "labels": {
        "last-name": 'Фамилия',
        "patronymic": "Отчество",
        "first-name": 'Имя',
        "email-for-notices": "E-mail (для уведомлений)",
        "roles": "Роли",
        "language": "Язык",
        "save-changes": 'Сохранить изменения',
        "changes-saved": "Изменения сохранены",
        "tariff-create": "Создать тариф",
        "tariff-created": "Тариф создан",
        "cost": "Стоимость",
        "short-description": 'Краткое описание',
        "full-description": 'Полное описание',
        'cancel': 'Отменить',
        'destroy': 'Удалить',
        'daily_cost': 'Суточная стоимость',
        "service-create": "Создать услугу",
        "service-update": 'Обновить услугу',
        "service-category-create": 'Создать категорию',
        "service-category-creating": 'Создание категории',
        "service-category-created": "Категория создана",
        "name-category": 'Наименование категории',
        "write-name-category": "Введите наименование категории",
    },
    actions: {
        'create-user': 'Создать пользователя',
    },
    successfully: {
        'user-created': 'Пользователь создан',
    },
    tables: {
        users: {
            'full-name': 'ФИО',
            'roles': 'Роль',
            'contact-number': 'Контактный телефон'
        },
        tariffs: {
            "name": "Наименование",
            "cost": "Стоимость, руб."
        },
        'service-categories': {
            "name": "Наименование категории",
            "view": "Видимость",
            "view-started-screen": "Показывать на стартовом экране"
        }
    },
    "pages-names": {
        users: 'Пользователи',
        'create-user': 'Создание пользователя',
        'edit-user': 'Обновление пользователя',
    },
    pages: {
        profile: {
            header: 'Профиль'
        },
        users: {
            elements: {
                'dropdown-roles': 'Роли'
            },
            header: 'Пользователи',
            "empty-data": 'Здесь пока ничего нет',
            actions: {
                create: 'Создать пользователя',
            },
        },
    },
    menu: {
        users: 'Пользователи',
        states: 'Состояния',
        structure: 'Структура',
        objects: 'Объекты',
        tariffs: 'Тарифы',
        services: 'Услуги',
        counterparties: 'Контрагенты',
        reviews: 'Отзывы',
        partners: 'Партнеры',
        notices: 'Уведомления',
        requests: 'Реквизиты',
        support: 'Поддержка'
    }
};