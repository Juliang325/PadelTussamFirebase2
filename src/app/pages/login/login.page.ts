import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })


  constructor(
    private firebaseSvc:FirebaseService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private utilSvc: UtilsService
    ) { }

  ngOnInit() {
  }

  async submit(){
     this.login();
  }

  async login() {
   if(this.form.valid){

      await this.showLoading() 
      
      
      this.firebaseSvc.signIn(this.form.value as User).then(res => {
        this.getUserInfo(res.user.uid);
      }).catch( error => {
        console.log(error)
        this.presentToast({
          message: error.message,
          duration: 1500,
          position: 'middle',
          color: 'primary',
          icon: 'alert-circle-outline'
        })
      }).finally(() => {
        this.loadingCtrl.dismiss();
      })
     

    }
  }

  async getUserInfo(uid: string) {
    if (this.form.valid) {
      await this.showLoading()
      let path = `users/${uid}`
      //Borrar la contraseña para no pasarla a la base de datos
      delete this.form.value.password;
      this.firebaseSvc.setDocument(path, this.form.value).then(async res => {

        this.utilSvc.saveInLocalStorage('user', this.form.value)
        //Enrutar al home
        this.utilSvc.routerLink('home');
        //Reseteamos el formulario
        this.form.reset();

      }).catch(error => {
        console.log(error) 
        this.presentToast({
          message: error.message,
          duration: 1500,
          position: 'middle',
          color: 'primary',
          icon: 'alert-circle-outline'
        })
      }).finally(() => {
        console.log('y aqui?')
        this.loadingCtrl.dismiss();
      })

    }
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


}
