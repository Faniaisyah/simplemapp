import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { Geolocation } from '@capacitor/geolocation';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() {}
  private latitude: number | any;
  private longitude: number | any;

  public async ngOnInit() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;

    // Buat peta dan tampilan peta
    const map = new Map({
      basemap: "topo-vector"
    });

    const view = new MapView({
      container: "container",
      map: map,
      zoom: 14,
      center: [this.longitude, this.latitude]
    });

    // Buat layer grafik untuk menambahkan marker
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    // Buat simbol untuk marker
    const markerSymbol = new SimpleMarkerSymbol({
      color: [226, 119, 40], // Warna marker (orange)
      outline: {
        color: [255, 255, 255], // Warna outline (putih)
        width: 2
      }
    });

    // Buat point untuk lokasi saat ini
    const point = new Point({
      longitude: this.longitude,
      latitude: this.latitude
    });

    // Buat grafik untuk marker
    const pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol
    });

    // Tambahkan marker ke layer grafik
    graphicsLayer.add(pointGraphic);
  }

}
