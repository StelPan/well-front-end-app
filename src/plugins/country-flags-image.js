const LoadImage = (name) => {
    return require('../assets/images/flags/' + name);
}

const countryFlagsImage = {
    "Russia": "russia.svg",
    "Austria": "austria.svg",
    "Azerbaijan": "azerbaijan.svg",
    "Australia": "australia.svg"
};

const loadCountryImage = (country = "Russia") => {
    if (countryFlagsImage.hasOwnProperty(country)) {
        return LoadImage(countryFlagsImage[country]);
    }

    return LoadImage(countryFlagsImage['Russia']);
};

export default loadCountryImage;