import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { League } from 'src/app/interfaces/league';
import { Match } from 'src/app/interfaces/match';
import { User } from 'src/app/interfaces/user';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  leagues:League[]=[];
  user = {} as User;

  constructor(private firebaseSvc: FirebaseService,private loadingCtrl:LoadingController, private toastCtrl: ToastController) {
   }

  ngOnInit() {
    
   }

  ionViewWillEnter() {
    this.getIdUser();
    this.getLeagues();
    this.getUsers();
    //Dudas sobre obtener un documento
    this.getLeague();
  }
  async getLeagues(){
    let path = `leagues`
    let sub = this.firebaseSvc.getCollectinData(path).subscribe({
      next: (res:any) => {
        console.log(res);
        this.leagues = res;
        sub.unsubscribe;
      }
    })
  }

  //Para obtener cualquier coleccion de la base de datos
  async getUsers(){
    let path = 'users';
    let sub = this.firebaseSvc.getCollectinData(path).subscribe({
      next: (res: any) => {
        console.log(res);
        sub.unsubscribe;
      },
      error: (error:any) =>{

      }
    });
  }

  async getLeague(){
    let uid = 'PrimeraId'
    let path = `leagues/${uid}`
    let sub = this.firebaseSvc.getDocument(path).then(
      (res:any ) => {
        console.log('Respuesta: ' + res);
      }
    );
    
  }
  //Obtener el id del usuario autentificado
  getIdUser(){
    const auth = getAuth();
     auth.onAuthStateChanged((user) => {
       if (user) {
         const uid = user.uid;
         this.user.uid = uid;
       }
     });
  }

  async addDocument(){
    let path = `users/${this.user.uid}/matchs`;
    const match: Match = {
      result: '2:1',
      date: '26/03/2002',
      place: 'casillas padel'
    };
    console.log(path);
    const response = await this.firebaseSvc.addDocument(path,match)
    console.log(response)
  }

  async deleteDocument(id:string){
    let path = `leagues/${id}`
    this.firebaseSvc.deleteDocument(path).then(async res =>{

      this.leagues = this.leagues.filter(league => league.id !== id)

      this.presentToast({
        message: "Personaje borrado con exito",
        duration: 1500,
        position: 'middle',
        color: 'primary',
        icon: 'checkmark-circle-outline'
      })
    }).catch(error => {
      console.log(error);
      this.presentToast({
        message: error.message,
        duration: 1500,
        position: 'middle',
        color: 'primary',
        icon: 'alert-circle-outline'
      })
    })
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'espere...',
    });

    loading.present();
  }

  async presentToast(opts?: ToastOptions){
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  signOut(){
    this.firebaseSvc.signOut();
  }
} 
