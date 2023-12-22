import site from 'assets/project/meta/site'

export default {
    name:site.siteName,
    description: "Destination management and high-end expedition services in Iceland, Greenland and Arctic regions for luxury travellers and corporate groups.",
    identityPage: `${site.siteUrl}/about`, // about page
    type: 'TravelAgency',
    address: {
        addressCountry: 'Iceland',
        addressLocality: "200 Kópavogur",
        addressRegion: "Reykjavik",
        streetAddress: "Vesturvör 30b"
    },
    tel:'+354 568 3030',
    alternateName: 'HL',
    email: "info@hl.is",
    priceRange: '$$$$',
    logo:{
        url: '', //to do
        width: 90,
        height:60
    },
    founder: "Jón Ólafur Magnússon",
    foundingDate: "2000-01-01",
    foundingLocation: "Reykjavik, Iceland",
    geo: {
        latitude: 64.1153154,
        longitude: -21.939435
    },
    image: {
        url: '', // to do
        width: 2160,
        height: 1440
    }
}