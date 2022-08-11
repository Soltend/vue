import companyTypes from '../Config/Catalogs/CompanyTypes.json'

const getCompanyTypes = (companyList) => {
    return companyList.map((company) => {
        const arr = company.type.types;
        let type = [];

        arr.forEach((el) => {
            const result = companyTypes.types.find((item) => item.id === el);
            type.push(result.name)
        })

        return {
            ...company,
            type: type.join(', ')
        };
    })
}

const companyTypesList = () => {
    return companyTypes.types;
}

export { getCompanyTypes, companyTypesList }