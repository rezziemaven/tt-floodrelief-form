var mymap = L.map('mapid').setView([10.6918, -61.2225], 9);
    var marker = L.marker([10.6918, -61.2225], {
      draggable: true,
      riseOnHover: true,
      autoPan: true
    }).addTo(mymap);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: accessToken,
    }).addTo(mymap);

    //method to change input of lat and long in form
    marker.on('mouseup', function () {
      let {
        lat,
        lng
      } = marker.getLatLng();
      setLatLng(lat, lng);
    })

    mymap.on('click', function (e) {
      let {
        lat,
        lng
      } = e.latlng;
      setLatLng(lat, lng);
      $('.address').val('');
      getAddress(lat, lng);
    });

    function setLatLng(lat, lng) {
      let zoom = mymap.getZoom();
      marker.setLatLng([lat, lng]);
      (zoom < 14) ? mymap.setView([lat, lng], 14): mymap.setView([lat, lng]);
      $('#latitude').val(lat);
      $('#longitude').val(lng);
    }

    function getAddress(lat, lng) {
      let url =
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?country=tt&access_token=${accessToken}`;
      axios.get(url)
        .then(function (response) {
          if (response.data.features.length) {
            let placeName = response.data.features[0].place_name;
            setAddress(placeName);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function setAddress(address) {
      let value = address.split(',');
      if (value.length >= 3) {
        $('#address1').val(value[0]);
        $('#address2').val(value[1]);
        $('#town').val(value[2]);
      }
    }

    var address1, address2, town;

    var timeout = null;

    $('.address').on('keyup', function (e) {
      address1 = $('#address1').val();
      address2 = $('#address2').val();
      town = $('#town').val();
      if (address1 && town) {
        var address = `${address1}, ${address2 || ' '}, ${town}`;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          let url =
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?country=tt&access_token=${accessToken}`;
          axios.get(url)
            .then(function (response) {
              if (response.data.features.length) {
                let [lng, lat] = response.data.features[0].center;
                setLatLng(lat, lng);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }, 2000)
      }
    })

    //when api is finished setting up
    $('#submit').click(function (e) {
      e.preventDefault();
      axios.post(postURL, {
          title: $('#title').val(),
          description: $('#description').val(),
          latitude: $('#latitude').val(),
          longitude: $('#longitude').val(),
          address1: $('#address1').val(),
          address2: $('#address2').val(),
          town: $('#town').val(),
          phone1: $('#phone1').val(),
          contact1: $('#contact1').val(),
          phone2: $('#phone2').val(),
          contact2: $('#contact2').val(),
          email: $('#email').val(),
          website: $('#website').val(),
          facebook: $('#facebook').val()
        })
        .then(function (response) {
          setTimeout(function () {
            window.location.href = homeURL;
          }, 2000)
        })
        .catch(function (error) {
          console.log(error);
        });
    })