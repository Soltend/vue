import cloneDeep from 'lodash/cloneDeep';

const getFieldValidate = (field) => {
    const item = {
        class: field.class,
        required: field.required,
        value: field.value
    }

    if (item.required === false) {
        return true;
    }

    if (item.class === 'name') {
        return nameValidate(item.value);
    }

    if (item.class === 'email') {
        return emailValidate(item.value);
    }

    if (item.class === 'password' || item.class === 'old' || item.class === 'new') {
        return passwordValidate(item.value);
    }

    if (item.class === 'phone') {
        return phoneValidate(item.value);
    }
}

const emailValidate = value => {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return EMAIL_REGEXP.test(value);
}

const nameValidate = value => {
    if (!value) return false;
    return value.length >= 3;
}

const passwordValidate = value => {
    if (!value) return false;
    return value.length >= 4;
}

const phoneValidate = value => {
    return value.length === 15;
}

const checkingFields = (fields) => {
    if (fields.list) {
        return fields.list.length;
    }

    return Object.values(fields).every((field) => {
        if (field.required !== undefined) {
            if (field.required !== false) {
                return field.required === getFieldValidate(field);
            }

            return true;
        } else {
            return checkingFields(field)
        }
    })
}

const matchFieldsValue = (fields, params) => {
    Object.keys(params).forEach((key) => {
        if (fields[key]) {
            if (fields[key].value !== undefined) {
                fields[key].value = params[key];
            }
        }
    })

    Object.values(fields).forEach((item) => {
        if (typeof item === 'object' && item !== null) {
            matchFieldsValue(item, params);
        }
    })

    return fields;
}

const relateFields = (inputFields, params) => {
    const fields = cloneDeep(inputFields);

    return matchFieldsValue(fields, params)
}

export { getFieldValidate, checkingFields, relateFields }