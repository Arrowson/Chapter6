# Chapter 6

### Problems

I had some problems with this project even though I've been working on it
off and on for a few weeks. I'm not sure what I wasn't "getting" about it.

Right now, when it runs, it gives me an error where it can't get the url.
I replaced it with 
```
 /*
    var url = '/api/forecast/' + $stateParams.lat + ',' + $stateParams.lng
   
		var trustedUrl = $sce.trustAsResourceUrl(url);						
    
    $http.jsonp(trustedUrl, {jsonpCallbackParam: 'callback'})
    */
```

like we did in previous chapters, but it runs into the problem with url.replace 
isn't a function. I remember you covering what that meant in class during chapter 4, but
I can't for the life of me remember what the answer was.

