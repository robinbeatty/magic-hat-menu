import site from './site'
import identity from './identity'
import entity from './entity'
import verification from './verification'
import { openingHours } from './openingHours'
import social from './social'

export const siteVars = {
    "siteName": identity.name,
    "identity": {
        "siteType": entity.type,
        "siteSubType": "LocalBusiness",
        "siteSpecificType": identity.type,
        "computedType": identity.type,
        "genericName": identity.name,
        "genericAlternateName": identity.alternateName,
        "genericDescription": identity.description,
        "genericUrl": site.siteUrl,
        "genericImage": identity.image.url,
        "genericImageWidth": identity.image.width,
        "genericImageHeight": identity.image.height,
        "genericTelephone": identity.tel,
        "genericEmail": identity.email,
        "genericStreetAddress": identity.address.streetAddress,
        "genericAddressLocality": identity.address.addressLocality,
        "genericAddressRegion": identity.address.addressCountry,
        "genericPostalCode": "",
        "genericAddressCountry": identity.address.addressCountry,
        "genericGeoLatitude": identity.geo.latitude,
        "genericGeoLongitude": identity.geo.longitude,
        "organizationFounder": identity.founder,
        "organizationFoundingDate": identity.foundingDate,
        "organizationFoundingLocation": identity.foundingLocation,
        "organizationContactPoints": [{
            "telephone": identity.tel,
            "contactType": "sales"
        }],
        "corporationTickerSymbol": "",
        "localBusinessPriceRange": identity.priceRange,
        "localBusinessOpeningHours": openingHours,
    },
    /*
    "creator": {
        "siteType": "Organization",
        "siteSubType": "LocalBusiness",
        "siteSpecificType": "",
        "computedType": "Organization",
        "genericName": "",
        "genericAlternateName": "",
        "genericDescription": "",
        "genericUrl": "",
        "genericImage": "",
        "genericImageWidth": "",
        "genericImageHeight": "",
        "genericImageIds": [],
        "genericTelephone": "",
        "genericEmail": "",
        "genericStreetAddress": "",
        "genericAddressLocality": "",
        "genericAddressRegion": "",
        "genericPostalCode": "",
        "genericAddressCountry": "",
        "genericGeoLatitude": "",
        "genericGeoLongitude": "",
        "personGender": "",
        "personBirthPlace": "",
        "organizationDuns": "",
        "organizationFounder": "",
        "organizationFoundingDate": "",
        "organizationFoundingLocation": "",
        "organizationContactPoints": [],
        "corporationTickerSymbol": "",
        "localBusinessPriceRange": "",
        "localBusinessOpeningHours": [],
        "restaurantServesCuisine": "",
        "restaurantMenuUrl": "",
        "restaurantReservationsUrl": ""
    },
    */
    "twitterHandle":social.twitterHandle,
    "facebookProfileId":social.facebookHandle,
    "facebookAppId":social.facebookAppId,
    "googleSiteVerification": verification.googleSiteVerification,
    "bingSiteVerification": verification.bingSiteVerification,
    "pinterestSiteVerification": verification.pinterestSiteVerification,
    "facebookSiteVerification": verification.facebookSiteVerification,
    "sameAsLinks": {
        "twitter": {
            "siteName": "Twitter",
            "handle": "twitter",
            "url": `https://twitter.com/${social.twitterHandle}`,
            "account":social.twitterHandle
        },
        "facebook": {
            "siteName": "Facebook",
            "handle": "facebook",
            "url": `https://www.facebook.com/${social.facebookHandle}/`,
            "account":social.facebookHandle
        },
        "linkedin": {
            "siteName": "LinkedIn",
            "handle": "linkedin",
            "url": `https://www.linkedin.com/company/${social.linkedInHandle}`,
            "account":social.linkedInHandle
        },
        "instagram": {
            "siteName": "Instagram",
            "handle": "instagram",
            "url": `https://www.instagram.com/${social.instagramHandle}`,
            "account":social.instagramHandle
        }
    },
    "siteLinksSearchTarget": "",
    "siteLinksQueryInput": "",
    "referrer": "no-referrer-when-downgrade",
    "additionalSitemapUrls": [],
    "additionalSitemapUrlsDateUpdated": null,
    "additionalSitemaps": []
}
export const jsonLd = {
    "mainEntityOfPage": {
        "@context": "http://schema.org",
        "@type": entity.type,
        "description": entity.description,
        "image": {
            "@type": "ImageObject",
            "url": entity.image.url
        },
        "mainEntityOfPage": entity.url,
        "name": entity.name,
        "url": entity.url
    },
    "identity": {
        "@context": "http://schema.org",
        "@id": identity.identityPage,
        "@type": identity.type,
        "address": {
            "@type": "PostalAddress",
            ...identity.address
        },
        "alternateName": identity.alternateName,
        "description": identity.description,
        "email": identity.email,
        "founder": identity.founder,
        "foundingDate": identity.foundingDate,
        "foundingLocation": identity.foundingLocation,
        "geo": {
            "@type": "GeoCoordinates",
            ...identity.geo
        },
        "image": {
            "@type": "ImageObject",
            ...identity.image
        },
        "logo": {
            "@type": "ImageObject",
            ...identity.logo
        },
        "name": identity.name,
        "priceRange": identity.priceRange,
        "sameAs": [`https://twitter.com/${social.twitterHandle}`, `https://www.facebook.com/${social.facebookHandle}/`, `https://www.linkedin.com/company/${social.linkedInHandle}`, `https://www.instagram.com/${social.instagramHandle}`],
        "telephone": identity.tel,
        "url": site.siteUrl
    },
    "breadcrumbList": {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        "description": "Breadcrumbs list",
        "itemListElement": [{
            "@type": "ListItem",
            "item": site.siteUrl,
            "name": "Homepage",
            "position": 1
        }],
        "name": "Breadcrumbs"
    }
}