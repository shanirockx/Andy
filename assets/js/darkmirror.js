
description_status = false;

function showDescription() {
    if (description_status === false) {
        $("#darkMirrorDescription").slideDown();
        description_status = true;
        $("#descriptionButton").css("background-color", "#275e77");
        $("#descriptionButton").css(
        "-webkit-box-shadow",
        "0px 4px 14px -5px rgba(0, 0, 0, 0.58)"
        );
        $("#descriptionButton").css(
        "-moz-box-shadow",
        "0px 4px 14px -5px rgba(0, 0, 0, 0.58)"
        );
        $("#descriptionButton").css(
        "box-shadow",
        "0px 4px 14px -5px rgba(0, 0, 0, 0.58)"
        );
    } else {
        $("#darkMirrorDescription").slideUp();
        description_status = false;
        $("#descriptionButton").css("background-color", "#2F90B0");
        $("#descriptionButton").css("-webkit-box-shadow", "none");
        $("#descriptionButton").css("-moz-box-shadow", "none");
        $("#descriptionButton").css("box-shadow", "none");
    }
}

//chart country
const country_list = {
"United States": 11083,
Global: 7084,
India: 3471,
"Russian Federation": 2552,
"United Kingdom": 2145,
Indonesia: 1910,
France: 1777,
China: 1688,
};
let country_keys = Object.keys(country_list);
let country_counts = Object.values(country_list);
let country_list_html = "";

const topFiveCountries = country_keys
.filter((key) => key !== "Global")
.slice(0, 5);
const topFiveCounts = country_counts
.filter((_, index) => country_keys[index] !== "Global")
.slice(0, 5);

const countryCtx = document
.getElementById("countryChart")
.getContext("2d");
const countryChart = new Chart(countryCtx, {
type: "bar",
data: {
    labels: topFiveCountries,
    datasets: [
    {
        label: "Count",
        data: topFiveCounts,
        backgroundColor: [
        "rgba(255,204,1, 1)",
        "rgba(255, 69, 98, 1)",
        "rgba(247, 101, 163, 1)",
        "rgba(161, 85, 185, 1)",
        "rgba(55,174,245, 1)",
        ],
        borderColor: [
        "rgba(255,204,1, 0.6)",
        "rgba(255, 69, 98, 0.6)",
        "rgba(247, 101, 163, 0.6)",
        "rgba(161, 85, 185, 0.6)",
        "rgba(55,174,245, 0.6)",
        ],
        borderWidth: 1,
    },
    ],
},
options: {
    indexAxis: "y",
    plugins: {
    title: {
        display: true,
        text: "Top Target Countries",
        font: {
        size: 18,
        },
        color: "white",
    },
    legend: {
        display: false,
    },
    },
    scales: {
    y: {
        beginAtZero: true,
        ticks: {
        color: "white",
        },
    },
    x: {
        ticks: {
        color: "white",
        },
    },
    },
    layout: {
    padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
    },
    },
    responsive: true,
    maintainAspectRatio: false,
},
});

function formatCountryName(countryName) {
return countryName.toLowerCase().replace(/\s/g, "-");
}

//country dropdown
country_keys.forEach((element, index) => {
let flag_img_html = make_flag_html(
    get_country_code_by_name(element),
    element
);
let country_name_data_cy = formatCountryName(element);
if (get_country_code_by_name(element) === null) {
    let country_name_text_html = element;
    if (element.length > 15) {
    country_name_text_html = element.substring(0, 15) + "..";
    }
    flag_img_html = `<img style="width: 20px; vertical-align: middle;" src="assets/img/socradar-symbol-lines.webp"><span style="vertical-align: middle;" title="${element}"> ${country_name_text_html} </span>`;
}
if (element === "Global") {
    country_list_html =
    `<li class="filter" onclick="filter_func(this);" data-cy="dark-mirror-tags-global-opt"><span class="filter-key filter-country"><i class="fa fa-globe" style="font-size: 17px; margin-right: 3px; margin-left: 2px;"></i> Global </span> <span class="filter-value">${country_counts[index]}</span></li>` +
    country_list_html;
} else {
    country_list_html += `<li class="filter" onclick="filter_func(this);" data-cy="dark-mirror-tags-${country_name_data_cy}-opt"><span class="filter-key filter-country">${flag_img_html}</span> <span class="filter-value">${country_counts[index]}</span></li>`;
}
});
$(".countries-category-filter > ul").append(country_list_html);
$(".countries-category-filter > ul").on("click", ".filter", function () {
var selectedCountryWithCount = $(this)
    .find(".filter-country-full-name")
    .attr("title");
loadSelectedCountry(selectedCountryWithCount);
var selectedCountry = selectedCountryWithCount
    .match(/[a-zA-Z\s]+/)[0]
    .trim(); // Extract only the alphabetical characters
var industryDropdown = document.getElementById("dropdownMenuButton2");
var categoryDropdown = document.getElementById("dropdownMenuButton3");
let countryDropdown = document.getElementById("dropdownMenuButton1");
if (selectedCountry.length > 15) {
    selectedCountry = selectedCountry.substring(0, 15) + "...";
}
countryDropdown.innerHTML = "Country: " + selectedCountry;
industryDropdown.innerHTML = "Industry";
categoryDropdown.innerHTML = "Category";
});

function loadSelectedCountry(country) {
$("#selectedCountryDiv").text(country);
}

//news  dropdown
const newsCategories = {
ALL: { count: 975, filter_value: "ALL" },
Accommodation: { count: 300, filter_value: 35 },
"Accommodation\u0026Food Services": { count: 846, filter_value: 45 },
"Administrative \u0026 Support Services": {
    count: 657,
    filter_value: 33,
},
"Administrative \u0026Waste Management ": {
    count: 409,
    filter_value: 12,
},
"Administrative and Support and Waste Management and Remediation Services":
    {
    count: 115,
    filter_value:
        "Administrative and Support and Waste Management and Remediation Services",
    },
"Agriculture\u0026Forestry": { count: 161, filter_value: 1 },
"Air Transportation": { count: 446, filter_value: 26 },
"Arts \u0026 Entertainment": { count: 4070, filter_value: 15 },
Automotive: { count: 845, filter_value: 271 },
Banking: { count: 3255, filter_value: 55 },
Betting: { count: 703, filter_value: 52 },
"Beverag \u0026 Tobacco Manufacturing": { count: 21, filter_value: 21 },
"Chemical\u0026Pharmaceutical Manufacturing": {
    count: 404,
    filter_value: 46,
},
"Civic\u0026Social Organizations": { count: 965, filter_value: 38 },
"Clothing Stores": { count: 291, filter_value: 284 },
"Computer Design \u0026 Services": { count: 2888, filter_value: 359 },
Construction: { count: 634, filter_value: 43 },
"Construction of Buildings": { count: 160, filter_value: 19 },
"Credit Unions": { count: 24, filter_value: 42 },
"CryptoCurrency \u0026 NFT": { count: 2280, filter_value: 56 },
"Data Processing Services": { count: 307, filter_value: 29 },
"Delivery Services": { count: 338, filter_value: 50 },
"E-Commerce": { count: 5852, filter_value: 295 },
"Educational Services": { count: 3381, filter_value: 13 },
"Electrical Equipment, Appliance, and Component Manufacturing": {
    count: 226,
    filter_value: 24,
},
"Electrical\u0026Electronical Manufacturing": {
    count: 173,
    filter_value: 23,
},
"Energy \u0026 Utilities ": { count: 699, filter_value: 3 },
"Enterprises \u0026 Holding": { count: 82, filter_value: 11 },
Finance: { count: 5731, filter_value: 8 },
"Food Manufacturing": { count: 164, filter_value: 20 },
Fraud: { count: 118, filter_value: "Fraud" },
Government: { count: 3, filter_value: "Government" },
"HealthCare \u0026 Social Assistance": {
    count: 1878,
    filter_value: 14,
},
"Information Services": { count: 7976, filter_value: 7 },
Insurance: { count: 612, filter_value: 32 },
"Internet Publishing": { count: 570, filter_value: 54 },
"Justice \u0026 Safety Activities": { count: 96, filter_value: 39 },
"Legal Services": { count: 313, filter_value: "Legal Services" },
Manufacturing: { count: 2213, filter_value: 4 },
Mining: { count: 223, filter_value: 2 },
"Monetary Authorities-Central Bank": { count: 74, filter_value: 31 },
"National Security\u0026International Affairs": {
    count: 493,
    filter_value: 41,
},
"Oil \u0026 Gas": { count: 168, filter_value: 18 },
Other: { count: 6400, filter_value: 16 },
"Other Information Services": { count: 599, filter_value: 30 },
"Professional\u0026Technical Services": {
    count: 2567,
    filter_value: 10,
},
"Public Administration": { count: 7465, filter_value: 17 },
"Publishing Services": { count: 156, filter_value: 27 },
"Rail Transportation": { count: 59, filter_value: 47 },
"Real Estate": { count: 64, filter_value: "Real Estate" },
"Rental \u0026 Leasing": { count: 456, filter_value: 9 },
"Repair\u0026Maintenance": { count: 52, filter_value: 37 },
Restaurants: { count: 98, filter_value: 36 },
Retail: { count: 4948, filter_value: 44 },
"Sea Transportation": { count: 133, filter_value: 48 },
"Software Publishers": { count: 1048, filter_value: 51 },
"Space \u0026 Defense": { count: 222, filter_value: 40 },
Telecommunications: { count: 1965, filter_value: 28 },
"Textile \u0026 Fabric Manufacturing": { count: 62, filter_value: 22 },
"Transportation Equipment Manufacturing": {
    count: 2,
    filter_value: 25,
},
"Transportation\u0026Warehousing": { count: 796, filter_value: 6 },
"Truck\u0026Rail Transportation": { count: 219, filter_value: 49 },
"Wholesale Trade": { count: 326, filter_value: 5 },
};
const categoryData = [];
for (const [category, info] of Object.entries(newsCategories)) {
if (category.toLowerCase() !== "other") {
    categoryData.push({ category, count: info.count });
}
}

categoryData.sort((a, b) => b.count - a.count);
const topFiveIndustries = categoryData
.slice(0, 5)
.map((item) => item.category);
const topFiveIndustriesCounts = categoryData
.slice(0, 5)
.map((item) => item.count);

const industryCtx = document
.getElementById("industryChart")
.getContext("2d");
const IndustryChart = new Chart(industryCtx, {
type: "bar",
data: {
    labels: topFiveIndustries,
    datasets: [
    {
        color: "white",
        label: "Count",
        data: topFiveIndustriesCounts,
        backgroundColor: [
        "rgba(255,204,1, 1)",
        "rgba(255, 69, 98, 1)",
        "rgba(247, 101, 163, 1)",
        "rgba(161, 85, 185, 1)",
        "rgba(55,174,245, 1)",
        ],
        borderColor: [
        "rgba(255,204,1, 0.6)",
        "rgba(255, 69, 98, 0.6)",
        "rgba(247, 101, 163, 0.6)",
        "rgba(161, 85, 185, 0.6)",
        "rgba(55,174,245, 0.6)",
        ],
        borderWidth: 1,
    },
    ],
},
options: {
    indexAxis: "y",
    plugins: {
    title: {
        display: true,
        text: "Top Target Industries",
        font: {
        size: 18,
        },
        color: "white",
    },
    legend: {
        display: false,
    },
    },
    scales: {
    y: {
        beginAtZero: true,
        ticks: {
        color: "white",
        },
    },
    x: {
        ticks: {
        color: "white",
        },
    },
    },
    layout: {
    padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
    },
    },
    responsive: true,
    maintainAspectRatio: false,
},
});

//category  dropdown
const news_categories_names = [
"ALL",
"Accommodation",
"Accommodation&Food Services",
"Administrative & Support Services",
"Administrative &Waste Management ",
"Administrative and Support and Waste Management and Remediation Services",
"Agriculture&Forestry",
"Air Transportation",
"Arts & Entertainment",
"Automotive",
"Banking",
"Betting",
"Beverag & Tobacco Manufacturing",
"Chemical&Pharmaceutical Manufacturing",
"Civic&Social Organizations",
"Clothing Stores",
"Computer Design & Services",
"Construction",
"Construction of Buildings",
"Credit Unions",
"CryptoCurrency & NFT",
"Data Processing Services",
"Delivery Services",
"E-Commerce",
"Educational Services",
"Electrical Equipment, Appliance, and Component Manufacturing",
"Electrical&Electronical Manufacturing",
"Energy & Utilities ",
"Enterprises & Holding",
"Finance",
"Food Manufacturing",
"Fraud",
"Government",
"HealthCare & Social Assistance",
"Information Services",
"Insurance",
"Internet Publishing",
"Justice & Safety Activities",
"Legal Services",
"Manufacturing",
"Mining",
"Monetary Authorities-Central Bank",
"National Security&International Affairs",
"Oil & Gas",
"Other",
"Other Information Services",
"Professional&Technical Services",
"Public Administration",
"Publishing Services",
"Rail Transportation",
"Real Estate",
"Rental & Leasing",
"Repair&Maintenance",
"Restaurants",
"Retail",
"Sea Transportation",
"Software Publishers",
"Space & Defense",
"Telecommunications",
"Textile & Fabric Manufacturing",
"Transportation Equipment Manufacturing",
"Transportation&Warehousing",
"Truck&Rail Transportation",
"Wholesale Trade",
];
const sorted_news_categories_names = news_categories_names.sort();
let news_categories_names_html =
'<option value="disabled" disabled> Select News Categories</option>';
for (let i = 0; i < sorted_news_categories_names.length; i++) {
news_categories_names_html += `<option value="${sorted_news_categories_names[i]}" data-cy='darkmirror-subscribe-dialog-category-${sorted_news_categories_names[i]}-opt'>${sorted_news_categories_names[i]}</option>`;
}

$("#news_categories").append(news_categories_names_html);

const sorted_country_keys = country_keys.sort();
let news_countries_html =
'<option value="disabled" disabled> Select News Countries</option>';
for (let i = 0; i < sorted_country_keys.length; i++) {
news_countries_html += `<option value="${sorted_country_keys[i]}" data-cy='darkmirror-subscribe-dialog-country-${sorted_news_categories_names[i]}-opt'>${sorted_country_keys[i]}</option>`;
}

$("#news_countries").append(news_countries_html);

function make_flag_html(country_code, country_name_text, onerror = "") {
let country_name_text_html = country_name_text;
if (country_name_text.length > 15) {
    country_name_text_html = country_name_text.substring(0, 15) + "..";
}
return (
    '<img style="width: 20px; vertical-align: middle;" src="assets/img/flags/' +
    country_code +
    '.webp"  onerror="' +
    onerror +
    '">' +
    `<span style="vertical-align: middle;" title="${country_name_text}" class="filter-country-full-name">` +
    country_name_text_html +
    "</span>"
);
}

function get_country_code_by_name(country_name, alpha = "alpha2") {
const country_name_dict = {
    afghanistan: { alpha2: "af", alpha3: "afg" },
    albania: { alpha2: "al", alpha3: "alb" },
    algeria: { alpha2: "dz", alpha3: "dza" },
    andorra: { alpha2: "ad", alpha3: "and" },
    angola: { alpha2: "ao", alpha3: "ago" },
    "antigua and barbuda": { alpha2: "ag", alpha3: "atg" },
    argentina: { alpha2: "ar", alpha3: "arg" },
    armenia: { alpha2: "am", alpha3: "arm" },
    australia: { alpha2: "au", alpha3: "aus" },
    austria: { alpha2: "at", alpha3: "aut" },
    azerbaijan: { alpha2: "az", alpha3: "aze" },
    bahamas: { alpha2: "bs", alpha3: "bhs" },
    bahrain: { alpha2: "bh", alpha3: "bhr" },
    bangladesh: { alpha2: "bd", alpha3: "bgd" },
    barbados: { alpha2: "bb", alpha3: "brb" },
    belarus: { alpha2: "by", alpha3: "blr" },
    belgium: { alpha2: "be", alpha3: "bel" },
    belize: { alpha2: "bz", alpha3: "blz" },
    benin: { alpha2: "bj", alpha3: "ben" },
    bhutan: { alpha2: "bt", alpha3: "btn" },
    "bolivia (plurinational state of)": { alpha2: "bo", alpha3: "bol" },
    "bosnia and herzegovina": { alpha2: "ba", alpha3: "bih" },
    botswana: { alpha2: "bw", alpha3: "bwa" },
    brazil: { alpha2: "br", alpha3: "bra" },
    "brunei darussalam": { alpha2: "bn", alpha3: "brn" },
    bulgaria: { alpha2: "bg", alpha3: "bgr" },
    "burkina faso": { alpha2: "bf", alpha3: "bfa" },
    burundi: { alpha2: "bi", alpha3: "bdi" },
    "cabo verde": { alpha2: "cv", alpha3: "cpv" },
    cambodia: { alpha2: "kh", alpha3: "khm" },
    cameroon: { alpha2: "cm", alpha3: "cmr" },
    canada: { alpha2: "ca", alpha3: "can" },
    "central african republic": { alpha2: "cf", alpha3: "caf" },
    chad: { alpha2: "td", alpha3: "tcd" },
    chile: { alpha2: "cl", alpha3: "chl" },
    china: { alpha2: "cn", alpha3: "chn" },
    colombia: { alpha2: "co", alpha3: "col" },
    comoros: { alpha2: "km", alpha3: "com" },
    congo: { alpha2: "cg", alpha3: "cog" },
    "congo, democratic republic of the": { alpha2: "cd", alpha3: "cod" },
    "costa rica": { alpha2: "cr", alpha3: "cri" },
    "c\u00f4te d'ivoire": { alpha2: "ci", alpha3: "civ" },
    croatia: { alpha2: "hr", alpha3: "hrv" },
    cuba: { alpha2: "cu", alpha3: "cub" },
    cyprus: { alpha2: "cy", alpha3: "cyp" },
    czechia: { alpha2: "cz", alpha3: "cze" },
    denmark: { alpha2: "dk", alpha3: "dnk" },
    djibouti: { alpha2: "dj", alpha3: "dji" },
    dominica: { alpha2: "dm", alpha3: "dma" },
    "dominican republic": { alpha2: "do", alpha3: "dom" },
    ecuador: { alpha2: "ec", alpha3: "ecu" },
    egypt: { alpha2: "eg", alpha3: "egy" },
    "el salvador": { alpha2: "sv", alpha3: "slv" },
    "equatorial guinea": { alpha2: "gq", alpha3: "gnq" },
    eritrea: { alpha2: "er", alpha3: "eri" },
    estonia: { alpha2: "ee", alpha3: "est" },
    eswatini: { alpha2: "sz", alpha3: "swz" },
    ethiopia: { alpha2: "et", alpha3: "eth" },
    fiji: { alpha2: "fj", alpha3: "fji" },
    finland: { alpha2: "fi", alpha3: "fin" },
    france: { alpha2: "fr", alpha3: "fra" },
    gabon: { alpha2: "ga", alpha3: "gab" },
    gambia: { alpha2: "gm", alpha3: "gmb" },
    georgia: { alpha2: "ge", alpha3: "geo" },
    germany: { alpha2: "de", alpha3: "deu" },
    ghana: { alpha2: "gh", alpha3: "gha" },
    greece: { alpha2: "gr", alpha3: "grc" },
    grenada: { alpha2: "gd", alpha3: "grd" },
    guatemala: { alpha2: "gt", alpha3: "gtm" },
    guinea: { alpha2: "gn", alpha3: "gin" },
    "guinea-bissau": { alpha2: "gw", alpha3: "gnb" },
    guyana: { alpha2: "gy", alpha3: "guy" },
    haiti: { alpha2: "ht", alpha3: "hti" },
    honduras: { alpha2: "hn", alpha3: "hnd" },
    "hong kong": { alpha2: "hk", alpha3: "hkg" },
    hungary: { alpha2: "hu", alpha3: "hun" },
    iceland: { alpha2: "is", alpha3: "isl" },
    india: { alpha2: "in", alpha3: "ind" },
    indonesia: { alpha2: "id", alpha3: "idn" },
    "iran (islamic republic of)": { alpha2: "ir", alpha3: "irn" },
    "iran, islamic republic of": { alpha2: "ir", alpha3: "irn" },
    iraq: { alpha2: "iq", alpha3: "irq" },
    ireland: { alpha2: "ie", alpha3: "irl" },
    israel: { alpha2: "il", alpha3: "isr" },
    italy: { alpha2: "it", alpha3: "ita" },
    jamaica: { alpha2: "jm", alpha3: "jam" },
    japan: { alpha2: "jp", alpha3: "jpn" },
    jordan: { alpha2: "jo", alpha3: "jor" },
    kazakhstan: { alpha2: "kz", alpha3: "kaz" },
    kenya: { alpha2: "ke", alpha3: "ken" },
    kiribati: { alpha2: "ki", alpha3: "kir" },
    "korea (democratic people's republic of)": {
    alpha2: "kp",
    alpha3: "prk",
    },
    "korea, republic of": { alpha2: "kr", alpha3: "kor" },
    kuwait: { alpha2: "kw", alpha3: "kwt" },
    kyrgyzstan: { alpha2: "kg", alpha3: "kgz" },
    "lao people's democratic republic": { alpha2: "la", alpha3: "lao" },
    latvia: { alpha2: "lv", alpha3: "lva" },
    lebanon: { alpha2: "lb", alpha3: "lbn" },
    lesotho: { alpha2: "ls", alpha3: "lso" },
    liberia: { alpha2: "lr", alpha3: "lbr" },
    libya: { alpha2: "ly", alpha3: "lby" },
    liechtenstein: { alpha2: "li", alpha3: "lie" },
    lithuania: { alpha2: "lt", alpha3: "ltu" },
    luxembourg: { alpha2: "lu", alpha3: "lux" },
    madagascar: { alpha2: "mg", alpha3: "mdg" },
    malawi: { alpha2: "mw", alpha3: "mwi" },
    malaysia: { alpha2: "my", alpha3: "mys" },
    maldives: { alpha2: "mv", alpha3: "mdv" },
    mali: { alpha2: "ml", alpha3: "mli" },
    malta: { alpha2: "mt", alpha3: "mlt" },
    "marshall islands": { alpha2: "mh", alpha3: "mhl" },
    mauritania: { alpha2: "mr", alpha3: "mrt" },
    mauritius: { alpha2: "mu", alpha3: "mus" },
    mexico: { alpha2: "mx", alpha3: "mex" },
    "micronesia (federated states of)": { alpha2: "fm", alpha3: "fsm" },
    "moldova, republic of": { alpha2: "md", alpha3: "mda" },
    monaco: { alpha2: "mc", alpha3: "mco" },
    mongolia: { alpha2: "mn", alpha3: "mng" },
    montenegro: { alpha2: "me", alpha3: "mne" },
    morocco: { alpha2: "ma", alpha3: "mar" },
    mozambique: { alpha2: "mz", alpha3: "moz" },
    myanmar: { alpha2: "mm", alpha3: "mmr" },
    namibia: { alpha2: "na", alpha3: "nam" },
    nauru: { alpha2: "nr", alpha3: "nru" },
    nepal: { alpha2: "np", alpha3: "npl" },
    netherlands: { alpha2: "nl", alpha3: "nld" },
    "new zealand": { alpha2: "nz", alpha3: "nzl" },
    nicaragua: { alpha2: "ni", alpha3: "nic" },
    niger: { alpha2: "ne", alpha3: "ner" },
    nigeria: { alpha2: "ng", alpha3: "nga" },
    "north macedonia": { alpha2: "mk", alpha3: "mkd" },
    norway: { alpha2: "no", alpha3: "nor" },
    oman: { alpha2: "om", alpha3: "omn" },
    pakistan: { alpha2: "pk", alpha3: "pak" },
    palau: { alpha2: "pw", alpha3: "plw" },
    panama: { alpha2: "pa", alpha3: "pan" },
    "papua new guinea": { alpha2: "pg", alpha3: "png" },
    paraguay: { alpha2: "py", alpha3: "pry" },
    peru: { alpha2: "pe", alpha3: "per" },
    philippines: { alpha2: "ph", alpha3: "phl" },
    poland: { alpha2: "pl", alpha3: "pol" },
    portugal: { alpha2: "pt", alpha3: "prt" },
    qatar: { alpha2: "qa", alpha3: "qat" },
    romania: { alpha2: "ro", alpha3: "rou" },
    "russian federation": { alpha2: "ru", alpha3: "rus" },
    russia: { alpha2: "ru", alpha3: "rus" },
    rwanda: { alpha2: "rw", alpha3: "rwa" },
    "saint kitts and nevis": { alpha2: "kn", alpha3: "kna" },
    "saint lucia": { alpha2: "lc", alpha3: "lca" },
    "saint vincent and the grenadines": { alpha2: "vc", alpha3: "vct" },
    samoa: { alpha2: "ws", alpha3: "wsm" },
    "san marino": { alpha2: "sm", alpha3: "smr" },
    "sao tome and principe": { alpha2: "st", alpha3: "stp" },
    "saudi arabia": { alpha2: "sa", alpha3: "sau" },
    senegal: { alpha2: "sn", alpha3: "sen" },
    serbia: { alpha2: "rs", alpha3: "srb" },
    seychelles: { alpha2: "sc", alpha3: "syc" },
    "sierra leone": { alpha2: "sl", alpha3: "sle" },
    singapore: { alpha2: "sg", alpha3: "sgp" },
    slovakia: { alpha2: "sk", alpha3: "svk" },
    slovenia: { alpha2: "si", alpha3: "svn" },
    "solomon islands": { alpha2: "sb", alpha3: "slb" },
    somalia: { alpha2: "so", alpha3: "som" },
    "south africa": { alpha2: "za", alpha3: "zaf" },
    "south sudan": { alpha2: "ss", alpha3: "ssd" },
    spain: { alpha2: "es", alpha3: "esp" },
    "sri lanka": { alpha2: "lk", alpha3: "lka" },
    sudan: { alpha2: "sd", alpha3: "sdn" },
    suriname: { alpha2: "sr", alpha3: "sur" },
    sweden: { alpha2: "se", alpha3: "swe" },
    switzerland: { alpha2: "ch", alpha3: "che" },
    "syrian arab republic": { alpha2: "sy", alpha3: "syr" },
    tajikistan: { alpha2: "tj", alpha3: "tjk" },
    "tanzania, united republic of": { alpha2: "tz", alpha3: "tza" },
    thailand: { alpha2: "th", alpha3: "tha" },
    "timor-leste": { alpha2: "tl", alpha3: "tls" },
    togo: { alpha2: "tg", alpha3: "tgo" },
    tonga: { alpha2: "to", alpha3: "ton" },
    "trinidad and tobago": { alpha2: "tt", alpha3: "tto" },
    tunisia: { alpha2: "tn", alpha3: "tun" },
    turkey: { alpha2: "tr", alpha3: "tur" },
    turkmenistan: { alpha2: "tm", alpha3: "tkm" },
    tuvalu: { alpha2: "tv", alpha3: "tuv" },
    uganda: { alpha2: "ug", alpha3: "uga" },
    ukraine: { alpha2: "ua", alpha3: "ukr" },
    "united arab emirates": { alpha2: "ae", alpha3: "are" },
    "united kingdom": { alpha2: "gb", alpha3: "gbr" },
    "united kingdom of great britain and northern ireland": {
    alpha2: "gb",
    alpha3: "gbr",
    },
    uk: { alpha2: "gb", alpha3: "gbr" },
    "united states": { alpha2: "us", alpha3: "usa" },
    "united states of america": { alpha2: "us", alpha3: "usa" },
    usa: { alpha2: "us", alpha3: "usa" },
    uruguay: { alpha2: "uy", alpha3: "ury" },
    uzbekistan: { alpha2: "uz", alpha3: "uzb" },
    vanuatu: { alpha2: "vu", alpha3: "vut" },
    "venezuela (bolivarian republic of)": { alpha2: "ve", alpha3: "ven" },
    "viet nam": { alpha2: "vn", alpha3: "vnm" },
    vietnam: { alpha2: "vn", alpha3: "vnm" },
    yemen: { alpha2: "ye", alpha3: "yem" },
    zambia: { alpha2: "zm", alpha3: "zmb" },
    zimbabwe: { alpha2: "zw", alpha3: "zwe" },
};
const country_code = country_name_dict[country_name.toLowerCase()];
if (country_code) {
    return country_code[alpha].toUpperCase();
} else {
    return null;
}
}

function give_default_category_icon(elm) {
    elm.src = "assets/img/socradar-symbol-lines.webp";
}

let filter_all_html = $(".f-ALL");
$(".f-ALL").click();
$(".categories-category-filter > ul").prepend(filter_all_html);