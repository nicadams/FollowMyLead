

var userInfoInSidebar = function(users) {
  return `
    <article class="user">
      <header class="user-header">
      <img class="avatar" src="${users.avatar}">
      <span class="handle">${users.handle}</span>
    </header>
      <span class="bio">
        ${users.bio}
      </span>
    </article>
  `;
};

var favouriteMapInSidebar = function(favouriteMapInfo) {
  //console.log(favouriteMapInfo);
  return `
    <article class="map">
      <div class="left">
        <img class="avatar" src="${favouriteMapInfo.avatar}">
      </div>
      <div class="right">
        <div class="handle">${favouriteMapInfo.handle}'s map:</div>
        <div class="map-name">"${favouriteMapInfo.name}"</div>
        <div class="map-id" style="display: none">"${favouriteMapInfo.map_id}"</div>
      </div>
    </article>
  `;
};

var followedUsersInSidebar = function(followedUsersInfo) {
  return `
    <article class="followed">
      <div class="left">
        <img class="avatar" src="${followedUsersInfo.avatar}">
      </div>
      <div class="right">
        <div class="handle">${followedUsersInfo.handle}</div>
        <div class="bio">"${followedUsersInfo.bio}"</div>
        <div class="user-id" style="display: none">"${followedUsersInfo.id}"</div>
      </div>
    </article>
  `;
};

var loadUser = function() {
  $.get('api/users/3', function(data) {
    var theObject = data[0];
    $('.upper-sidebar').empty().append(userInfoInSidebar(theObject));
  })
};



 var loadFavourites = function () {
    $.get('/api/users/2/favourites', function(data) {
    //console.log(data);
    //$('.lower-sidebar-body').empty();
    data.forEach(function(entry) {
      //console.log(entry);
      $('.favorites-body').append(favouriteMapInSidebar(entry));
    });
  });

  $.get('/api/users/2/following', function(data) {
    data.forEach(function(entry) {
      $('.followed-body').hide().append(followedUsersInSidebar(entry));
    });
  });

  // Click on an avatar to load a new map:

  //   $.get('/api/map/:id/locations', function(data) {
  //   var theObject = data[0];
  //   $('.upper-sidebar').empty().append(userInfoInSidebar(theObject));
  // });
};

var loadMaps = function() {
  $.get('/api/maps/4', function(data) {
    console.log(data[0].name);
    var theObject = data[0].name;
    $('.maps').append(theObject);
  })
};


// subfunctions for the map:

var toggleSurrounder = function(noParamPerhaps) {      // name may change based on Mike's work

};

var renderOtherUsermap = function(mapinfo) {

}

var renderMapWatchers = function(mapWatchersInfo) {

};


/* Render the Map!! */

// var renderMap = function(mapinfo) {

//   $.get('/api/map/:id/locations', function(data) {
//     var theObject = data[0];
//     $('.upper-sidebar').empty().append(userInfoInSidebar(theObject));
//   });
//   // do something, including the purple stuff.
// }


  function renderHTML(locationId, img, description, url, place, userId) {

    var $section = $("<section>").addClass("popup-html-container").html('<img src=\'' + img + '\' class="popup-image"><br>' + '<span class="popup-placetitle"><h6>' + place + '</h6></span>');
    var $header = $("<header>").addClass("popup-header");
    var $content = $("<content>").addClass("popup-body").html(description + '<p>' + '<a class="popup-link" href=' + url + '>' + url + '</a>');
    var $footer = $("<footer>").addClass("popup-footer").html("<form method='post' action='/locations/" + locationId + "?_method=DELETE' ><button class='popup-edit'>Delete</button></form>");
    var $footer = $("<footer>").addClass("popup-footer").html("<button class='popup-add'>Add</button><button class='popup-edit'>Edit</button><form method='post' action='/locations/" + locationId + "?_method=DELETE' ><button class='popup-delete'>Delete</button></form>");


    $section.append($header);
    $section.append($content);
    $section.append($footer);

    return $($section).prop('outerHTML');

  };



  function renderForm(user, lat, long) {

    var $form = $("<form>").attr("method", "POST").attr("action", "/maps/" + user + "/locations/").addClass("popup-new-form form-group form-group-sm");

    var $nameLabel = $("<label>").attr("for", "name").text("Name");
    var $summaryLabel = $("<label>").attr("for", "summary").text("Summary");
    var $urlLabel = $("<label>").attr("for", "url").text("Website");
    var $imageLabel = $("<label>").attr("for", "image").text("Image");

    var $name = $("<input>").attr("id", "name_field").attr("name", "name");
    var $summary = $("<input>").attr("id", "summary_field").attr("name", "summary");
    var $url = $("<input>").attr("id", "url_field").attr("name", "url");
    var $image = $("<input>").attr("id", "image_field").attr("name", "image");
    var $long = $("<input>").attr("id", "long_field").attr("name", "long").attr("type", "hidden").attr("value", long);
    var $lat = $("<input>").attr("id", "lat_field").attr("name", "lat").attr("type", "hidden").attr("value", lat);
    var $button = $("<button>").text("Submit").attr("id", "newsubmit");

    var $category = $("<select>").attr("name", "category");

    var $points = $("<option>").attr("value", "Points of Interest").html("Points of Interest");
    var $beaches = $("<option>").attr("value", "Beaches").html("Beaches");
    var $restaurants = $("<option>").attr("value", "Restaurants").html("Restaurants");
    var $parks = $("<option>").attr("value", "Parks and Nature").html("Parks and Nature");
    var $cafes = $("<option>").attr("value", "Cafes").html("Cafes");

    $category.append($points);
    $category.append($beaches);
    $category.append($restaurants);
    $category.append($parks);
    $category.append($cafes);

    $form.append($nameLabel);
    $form.append($name);
    $form.append($summaryLabel);
    $form.append($summary);
    $form.append($urlLabel);
    $form.append($url);
    $form.append($imageLabel);
    $form.append($image);
    $form.append($long);
    $form.append($lat);
    $form.append($category);
    $form.append($button);

    return $($form).prop('outerHTML');

  };

  function renderEditForm(name, summary, url, image, user, lat, long, locationId) {

    var $form = $("<form>").attr("method", "POST").attr("action", "/locations/" + locationId + "?_method=PUT").attr("style", "display:none;").addClass("popup-edit-form");

    var $nameLabel = $("<label>").attr("for", "name").text("Name");
    var $summaryLabel = $("<label>").attr("for", "summary").text("Summary");
    var $urlLabel = $("<label>").attr("for", "url").text("URL");
    var $imageLabel = $("<label>").attr("for", "image").text("Image");

    var $name = $("<input>").attr("id", "name_field").attr("name", "name").attr("value", name);
    var $summary = $("<input>").attr("id", "summary_field").attr("name", "summary").attr("value", summary);
    var $url = $("<input>").attr("id", "url_field").attr("name", "url").attr("value", url);
    var $image = $("<input>").attr("id", "image_field").attr("name", "image").attr("value", image);
    var $long = $("<input>").attr("id", "long_field").attr("name", "long").attr("type", "hidden").attr("value", long);
    var $lat = $("<input>").attr("id", "lat_field").attr("name", "lat").attr("type", "hidden").attr("value", lat);
    var $button = $("<button>").text("Submit");

    var $category = $("<select>");

    var $points = $("<option>").attr("value", "Points of Interest").html("Points of Interest");
    var $beaches = $("<option>").attr("value", "Beaches").html("Beaches");
    var $restaurants = $("<option>").attr("value", "Restaurants").html("Restaurants");
    var $parks = $("<option>").attr("value", "Parks and Nature").html("Parks and Nature");
    var $cafes = $("<option>").attr("value", "Cafes").html("Cafes");

    $category.append($points);
    $category.append($beaches);
    $category.append($restaurants);
    $category.append($parks);
    $category.append($cafes);

    $form.append($nameLabel);
    $form.append($name);
    $form.append($summaryLabel);
    $form.append($summary);
    $form.append($urlLabel);
    $form.append($url);
    $form.append($imageLabel);
    $form.append($image);
    $form.append($long);
    $form.append($lat);
    $form.append($category);
    $form.append($button);

    return $($form).prop('outerHTML');

  };

  function renderAddForm(name, summary, url, image, userfrog, lat, long, locationId) {

    let user = "3";

    var $form = $("<form>").attr("method", "POST").attr("action", "/maps/" + "4" + "/locations/").attr("style", "display:none;").addClass("popup-add-form");

    var $nameLabel = $("<label>").attr("for", "name").text("Name");
    var $summaryLabel = $("<label>").attr("for", "summary").text("Summary");
    var $urlLabel = $("<label>").attr("for", "url").text("URL");
    var $imageLabel = $("<label>").attr("for", "image").text("Image");

    var $name = $("<input>").attr("id", "name_field").attr("name", "name").attr("value", name);
    var $summary = $("<input>").attr("id", "summary_field").attr("name", "summary").attr("value", summary);
    var $url = $("<input>").attr("id", "url_field").attr("name", "url").attr("value", url);
    var $image = $("<input>").attr("id", "image_field").attr("name", "image").attr("value", image);
    var $long = $("<input>").attr("id", "long_field").attr("name", "long").attr("type", "hidden").attr("value", long);
    var $lat = $("<input>").attr("id", "lat_field").attr("name", "lat").attr("type", "hidden").attr("value", lat);
    var $user = $("<input>").attr("id", "user").attr("name", "user").attr("type", "hidden").attr("value", user);
    var $button = $("<button>").text("Submit");

    var $category = $("<select>");

    var $points = $("<option>").attr("value", "Points of Interest").html("Points of Interest");
    var $beaches = $("<option>").attr("value", "Beaches").html("Beaches");
    var $restaurants = $("<option>").attr("value", "Restaurants").html("Restaurants");
    var $parks = $("<option>").attr("value", "Parks and Nature").html("Parks and Nature");
    var $cafes = $("<option>").attr("value", "Cafes").html("Cafes");

    $category.append($points);
    $category.append($beaches);
    $category.append($restaurants);
    $category.append($parks);
    $category.append($cafes);

    $form.append($nameLabel);
    $form.append($name);
    $form.append($summaryLabel);
    $form.append($summary);
    $form.append($urlLabel);
    $form.append($url);
    $form.append($imageLabel);
    $form.append($image);
    $form.append($long);
    $form.append($lat);
    $form.append($user);
    $form.append($category);
    $form.append($button);

    return $($form).prop('outerHTML');

  };

// var renderHTML = function (id, avatar, description, url, place) {

//       var $section = $("<section>").addClass("popup-container").html('<img src=\'' + avatar + '\' class="popup-image"><br>' + '<span class="popup-placetitle"><h6>' + place + '</h6></span>');
//       var $header = $("<header>").addClass("popup-header");
//       var $content = $("<content>").addClass("popup-body").html(description + '<p>' + '<a class="popup-link" href=' + url + '>' + url + '</a>');
//       // var $footer = $("<footer>").addClass("popup-footer").html("<form method='post' action='/locations/'' + id + '?_method=DELETE' ><button class='popup-edit' type='submit' value='Submit'>Delete</button></form>");

//       $section.append($header);
//       $section.append($content);
//       //$section.append($footer);

//       return $($section).prop('outerHTML');

//     };

//     var renderForm = function(user, lat, long) {

//       var $form = $("<form>").attr("method", "POST").attr("action", "/maps/" + user + "/locations/").addClass("popup-form");

//       var $nameLabel = $("<label>").attr("for", "name").text("Name");
//       var $summaryLabel = $("<label>").attr("for", "summary").text("Summary");
//       var $urlLabel = $("<label>").attr("for", "url").text("URL");
//       var $imageLabel = $("<label>").attr("for", "image").text("Image");

//       var $name = $("<input>").attr("id", "name_field").attr("name", "name");
//       var $summary = $("<input>").attr("id", "summary_field").attr("name", "summary");
//       var $url = $("<input>").attr("id", "url_field").attr("name", "url");
//       var $image = $("<input>").attr("id", "image_field").attr("name", "image");
//       var $long = $("<input>").attr("id", "long_field").attr("name", "long").attr("type", "hidden").attr("value", long);
//       var $lat = $("<input>").attr("id", "lat_field").attr("name", "lat").attr("type", "hidden").attr("value", lat);
//       var $button = $("<button>");

//       var $category = $("<select>");

//       var $points = $("<option>").attr("value", "Points of Interest").html("Points of Interest");
//       var $beaches = $("<option>").attr("value", "Beaches").html("Beaches");
//       var $restaurants = $("<option>").attr("value", "Restaurants").html("Restaurants");
//       var $parks = $("<option>").attr("value", "Parks and Nature").html("Parks and Nature");
//       var $cafes = $("<option>").attr("value", "Cafes").html("Cafes");

//       $category.append($points);
//       $category.append($beaches);
//       $category.append($restaurants);
//       $category.append($parks);
//       $category.append($cafes);

//       $form.append($nameLabel);
//       $form.append($name);
//       $form.append($summaryLabel);
//       $form.append($summary);
//       $form.append($urlLabel);
//       $form.append($url);
//       $form.append($imageLabel);
//       $form.append($image);
//       $form.append($long);
//       $form.append($lat);
//       $form.append($category);
//       $form.append($button);

//       return $($form).prop('outerHTML');
//     };


$(document).ready(function() {

  $(document).ajaxError(function(e, req, xhr) {
    var error;
    try
    {
      error = JSON.parse(req.responseText);
    }
    catch(e)
    {
      error = e
    }
  });

  //$('.content-primary').append('<span>HI APPEND ME PLEASE</span');

  loadUser();

  loadFavourites();

  loadMaps();

  //$.get('/api/users/:id').then(userInfoInSidebar());


  // // Compose button functionality
  // $('#nav-bar').find('.compose').on('click', function(event) {
  //   if ($('.new-tweet').is(':hidden') ) {
  //     $('.new-tweet').slideDown();
  //     $('.new-tweet').find('textarea').focus();
  //   } else {
  //     $('.new-tweet').slideUp();
  //   }
  // });

  // Toggle panes
  $('.lower-sidebar').find('.favorites-header').on('click', function(event) {
    if ($('.favorites-body').is(':hidden')) {
      $('.followed-body').hide();
      $('.favorites-body').show();
    }
  });

  $('.lower-sidebar').find('.followed-header').on('click', function(event) {
    if ($('.followed-body').is(':hidden')) {
      $('.favorites-body').hide();
      $('.followed-body').show();
    }
  });


  $('#new-map').on('click', function(e) {
    event.preventDefault();
    $('#new-map-name').fadeToggle('#new-map-name').addClass('show');
    $('#txtArea').focus();
  });

//});  // to continue document.ready()

  $('.favorites-body').on('click', 'img', function(event) {
    $('#initialmap').css("border"," 11px solid #FD6E06 ");
    $(this).parent().parent().parent().find('img').css("border", "0px");
    $(this).css("border"," 4px solid #FD6E06 ");
    $('#initialmap').empty();
    let tokenURL = 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicG90YXRvd2F2ZSIsImEiOiJjaXVzbzlsbHIwMGZhMnVwdmVoMGphOHNvIn0.HyG4kMGYnE6zVYU6IBr66Q';
    let attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';
    map.remove();
    map = L.map('initialmap').setView([49.2566, -123.11554], 12);

    var mapId = $(this).parent().next().find('.map-id').html();
    mapId = mapId.substring(1,2);
    routeString = `/api/map/${mapId}/locations`;
    console.log(routeString);
    //map.removeLayer(locationsOnMap);
    $.get( routeString, function(data) {
      //console.log(data);


      var locationsArray = [];
      let newLocation;

      function onMapClick(e) {
        if (newLocation !== undefined) {
          map.removeLayer(newLocation);
        }

        let coords = [e.latlng.lat, e.latlng.lng];
        newLocation = L.marker(coords).bindPopup(renderForm("1", e.latlng.lat, e.latlng.lng)).addTo(map).openPopup();

        // $('form').on('submit', function (event) {
        //   event.preventDefault();
        // })
      }


      map.on('click', onMapClick);

      console.log(data);

        for (let i = 0; i < data.length; i++) {

          let avatar = data[i].avatar;
          let summary = data[i].summary;
          let name = data[i].name;
          let url = data[i].url;
          let image = data[i].img;
          let category = data[i].category;
          let locationId = data[i].id;
          let userId = data[i].user_id;
          let long = data[i].longitude;
          let lat = data[i].latitude;

          var displayPopup = L.DomUtil.create('div', 'display-popup');

          let htmlView = renderHTML(locationId, image, summary, url, name, userId);

          let editView = renderEditForm(name, summary, url, image, userId, lat, long, locationId);

          let addView = renderAddForm(name, summary, url, image, userId, lat, long, locationId);

          displayPopup.innerHTML = htmlView + editView + addView;

          let coords = [lat, long];

          locationsArray.push(L.marker(coords).bindPopup(displayPopup));

          locationsOnMap = L.layerGroup(locationsArray).addTo(map);

            $('.popup-edit', displayPopup).load(function () {
              $('.popup-edit-form').hide();
            });

            $('.popup-edit', displayPopup).on('click', function() {
              $('.popup-html-container').hide();
              $('.popup-edit-form').show();
            });

            $('.popup-add', displayPopup).on('click', function() {
              $('.popup-html-container').hide();
              $('.popup-add-form').show();
            });

        };
    });

    L.tileLayer(tokenURL, { attribution: attribution, maxZoom: 18})
    .addTo(map);
    // the following method takes in an array of points to add to the map view



  });



  $('.followed-body').on('click', 'img', function(event) {
    $('#initialmap').css("border"," 11px solid #00ee00 ");
    $(this).parent().parent().parent().find('img').css("border", "0px");
    $(this).css("border"," 4px solid #00ee00 ");
    $('#initialmap').empty();
    let tokenURL = 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicG90YXRvd2F2ZSIsImEiOiJjaXVzbzlsbHIwMGZhMnVwdmVoMGphOHNvIn0.HyG4kMGYnE6zVYU6IBr66Q';
    let attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';
    map.remove();
    map = L.map('initialmap').setView([49.2566, -123.11554], 12);


    var userId = Math.ceil(Math.random()*5);  // Absolute, shameless display hack.
    console.log(userId);
    var routeString = `/api/users/${userId}/singlemap/locations`;

    $.get( routeString, function(data) {

      var locationsArray = [];
      let newLocation;

      function onMapClick(e) {
        if (newLocation !== undefined) {
          map.removeLayer(newLocation);
        }

        let coords = [e.latlng.lat, e.latlng.lng];
        newLocation = L.marker(coords).bindPopup(renderForm("1", e.latlng.lat, e.latlng.lng)).addTo(map).openPopup();

        // $('form').on('submit', function (event) {
        //   event.preventDefault();
        // })
      }


      map.on('click', onMapClick);

      console.log(data);

      for (let i = 0; i < data.length; i++) {
        //let handle = data[i].handle;
        let avatar = data[i].avatar;
        let summary = data[i].summary;
        let name = data[i].name;
        let url = data[i].url;
        let image = data[i].img;
        let category = data[i].category;
        let html = renderHTML("1", image, summary, url, name);
        let locationId = data[i].id;
        let coords = [data[i].latitude, data[i].longitude];
        locationsArray.push(L.marker(coords).bindPopup(html));
        L.layerGroup(locationsArray).addTo(map);

      };
    });

    L.tileLayer(tokenURL, { attribution: attribution, maxZoom: 18})
    .addTo(map);
    // the following method takes in an array of points to add to the map view

  });

  $('.followed-body').on('click', 'img', function(event) {
    $('#initialmap').css("border"," 11px solid #FD6E06 ");
    $(this).parent().parent().parent().find('img').css("border", "0px");
    $(this).css("border"," 4px solid #FD6E06 ");
    $('#initialmap').empty();
    let tokenURL = 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicG90YXRvd2F2ZSIsImEiOiJjaXVzbzlsbHIwMGZhMnVwdmVoMGphOHNvIn0.HyG4kMGYnE6zVYU6IBr66Q';
    let attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';
    map.remove();
    map = L.map('initialmap').setView([49.2566, -123.11554], 12);


    var userId = Math.ceil(Math.random()*5);  // Absolute, shameless display hack.
    console.log(userId);
    var routeString = `/api/users/${userId}/singlemap/locations`;

    $.get( routeString, function(data) {

      var locationsArray = [];
      let newLocation;

      function onMapClick(e) {
        if (newLocation !== undefined) {
          map.removeLayer(newLocation);
        }

        let coords = [e.latlng.lat, e.latlng.lng];
        newLocation = L.marker(coords).bindPopup(renderForm("1", e.latlng.lat, e.latlng.lng)).addTo(map).openPopup();

        // $('form').on('submit', function (event) {
        //   event.preventDefault();
        // })
      }


      map.on('click', onMapClick);

      console.log(data);

      for (let i = 0; i < data.length; i++) {
        //let handle = data[i].handle;
        let avatar = data[i].avatar;
        let summary = data[i].summary;
        let name = data[i].name;
        let url = data[i].url;
        let image = data[i].img;
        let category = data[i].category;
        let html = renderHTML("1", image, summary, url, name);
        let locationId = data[i].id;
        let coords = [data[i].latitude, data[i].longitude];
        locationsArray.push(L.marker(coords).bindPopup(html));
        L.layerGroup(locationsArray).addTo(map);

      };
    });

    L.tileLayer(tokenURL, { attribution: attribution, maxZoom: 18})
    .addTo(map);
    // the following method takes in an array of points to add to the map view

  });



    let tokenURL = 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicG90YXRvd2F2ZSIsImEiOiJjaXVzbzlsbHIwMGZhMnVwdmVoMGphOHNvIn0.HyG4kMGYnE6zVYU6IBr66Q';
    let attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';
    var map = L.map('initialmap').setView([49.2566, -123.11554], 12);
    // here is a pretend set of locations.
    $.get( "/api/users/2/singlemap/locations", function(data) {
      const locationsArray = [];
      let locationsOnMap;

      let marker;

      map.on('click', function(e) {

          if (marker !== undefined) {

            map.removeLayer(marker);

          }

          var position = L.marker(e.latlng);

          var newPopup = L.DomUtil.create('div', 'info-edit-popup');

          var html = renderForm("1", e.latlng.lat, e.latlng.lng);

          newPopup.innerHTML = html;

          marker = position.addTo(map).bindPopup(newPopup).openPopup();

          document.getElementById("newsubmit").addEventListener("click", function(event){

            event.preventDefault();

            $.ajax({

                method: 'post',
                url: '/maps/' + '2' + '/locations/',
                data: $('.popup-new-form').serialize(),
                success: function (result) {
                location.reload();
                let locationId = result[0];

                  $.get( "api/location/" + locationId, function(data) {

                    html = renderHTML(data[0].id, data[0].img, data[0].summary, data[0].url, data[0].name, data[0].user_id);

                    $('.info-edit-popup').html(html);

                  });

                }

            });

          });

      });

      function loadLocations() {


        for (let i = 0; i < data.length; i++) {

          let avatar = data[i].avatar;
          let summary = data[i].summary;
          let name = data[i].name;
          let url = data[i].url;
          let image = data[i].img;
          let category = data[i].category;
          let locationId = data[i].id;
          let userId = data[i].user_id;
          let long = data[i].longitude;
          let lat = data[i].latitude;

          var displayPopup = L.DomUtil.create('div', 'display-popup');

          let htmlView = renderHTML(locationId, image, summary, url, name, userId);

          let editView = renderEditForm(name, summary, url, image, userId, lat, long, locationId);

          let addView = renderAddForm(name, summary, url, image, userId, lat, long, locationId);

          displayPopup.innerHTML = htmlView + editView + addView;

          let coords = [lat, long];

          locationsArray.push(L.marker(coords).bindPopup(displayPopup));

          locationsOnMap = L.layerGroup(locationsArray).addTo(map);

            $('.popup-edit', displayPopup).load(function () {
              $('.popup-edit-form').hide();
            });

            $('.popup-edit', displayPopup).on('click', function() {
              $('.popup-html-container').hide();
              $('.popup-edit-form').show();
            });

            $('.popup-add', displayPopup).on('click', function() {
              $('.popup-html-container').hide();
              $('.popup-add-form').show();
            });

        };






    }

    loadLocations();





    });



    L.tileLayer(tokenURL, { attribution: attribution, maxZoom: 18})
    .addTo(map);





    // the following method takes in an array of points to add to the map view





});
