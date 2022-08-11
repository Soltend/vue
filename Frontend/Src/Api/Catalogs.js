import fieldsList from '../Config/Catalogs/Fields.json';
import navigationList from '../Config/Catalogs/Navigation.json'
import cloneDeep from 'lodash/cloneDeep';

const getFieldsList = (sectionName) => {
    return cloneDeep(fieldsList[sectionName]);
}

const getNavigationList = () => {
    return navigationList;
}

export { getFieldsList, getNavigationList };