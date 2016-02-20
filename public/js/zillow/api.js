

// returning a module
var Api = {};
// module.exports = Api;
Api.apiKey = 'X1-ZWz1f5yx3rj1fv_6sext';
Api.endpoints = {
	comps: 'http://www.zillow.com/webservice/GetComps.htm',
	getsearchresults: 'http://www.zillow.com/webservice/GetSearchResults.htm',
	getphotos: 'http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm'
};

/*
6614 Hidden Cove Dr
Davie Fl
33314
AIzaSyDi1ZZxwAYZsDKiz5D0CFm3tGTuHNmGtNc
*/

Api.addressLookup = function(endpoint, apiKey, address, citystate, zip) {
	var url;
	var address 	= address;
	var citystate 	= citystate;
	var zipcode 	= zip;

	url = endpoint + '?zws-id=' + Api.apiKey + '&address=' + address + '&citystatezip=' + citystate;
	url = encodeURI(url);

	return $.ajax({
		url: 'http://localhost:5000/api/comps',
		type: 'POST',
		data: {
			url: url,
		}
	})
};

Api.xml2json = function(resp){
	var x2js = new X2JS();
	var json = x2js.xml_str2json(resp);
	
	return json;
};

Api.fetchComps = function(endpoint, apiKey, zpid, count){
	// http://www.zillow.com/webservice/GetComps.htm?zws-id=X1-ZWz1f5yx3rj1fv_6sext&zpid=14671441&count=5
	var url = endpoint + '?zws-id=' + Api.apiKey + '&zpid=' + zpid + '&count=' + count;
	return $.ajax({
		url: 'http://localhost:5000/api/fetchComps',
		type: 'POST',
		data: {
			url: url
		}
	})
};

Api.getPhotos = function(endpoint, apiKey, zpid){
	var url = endpoint + '?zws-id=' + Api.apiKey + '&zpid=' + zpid;
	return $.ajax({
		url: 'http://localhost:5000/api/getPhotos',
		type: 'POST',
		data: {
			url: url
		}
	})
};

Api.initialize = function($, baseUrl) {
	// console.log('hi');	

	return {
		addressEndpoint: baseUrl + '/address',
		getApiKey: function(){
			return Api.apiKey;
		}
	};
};

// exporting the initialize method
module.exports = Api;