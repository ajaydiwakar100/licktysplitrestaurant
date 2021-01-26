import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Profile } from './profile.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { localisation } from '../../localisation/localisation';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';

declare var google: any;

interface Marker {
  lat: any;
  lng: any;
  draggable: boolean;
}

interface Location {
  lat: any;
  lng: any;
  zoom: any;
  marker?: Marker;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileList: Profile;
  profile: any;
  profileId: Number;
  image: String;
  outletName: String;
  email: String;
  status: String;
  addressLineOne: String;
  addressLineTwo: String;
  street: String;
  area: String;
  city: String;
  state: String;
  country: String;
  zipcode: String;
  contactNumber: String;

  latitude: any;
  longitude: any;
  geocoder: any;

  public location: Location = {
    lat: 13.040837,
    lng: 80.241828,
    marker: {
      lat: 13.040837,
      lng: 80.241828,
      draggable: true
    },
    zoom: 6
  };
  constructor(
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.params.subscribe( params => this.profileId = params.id );

    this.profileService.getProfile().subscribe (
      response => { 

        this.image = response.image;
        this.outletName = response.outletName;
        this.email = response.email;
        this.status = response.status.toString();
        this.addressLineOne = response.addressLineOne;
        this.addressLineTwo = response.addressLineTwo;
        this.street = response.street;
        this.area = response.area;
        this.city = response.city;
        this.state = response.state;
        this.country = response.country;
        this.zipcode = response.zipcode;
        this.city = response.city;
        this.contactNumber = response.contactNumber;     
        this.location.lat = response.latitude;
        this.location.lng = response.longitude;
        this.location.marker.lat = response.latitude;
        this.location.marker.lng = response.longitude;
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }



}
