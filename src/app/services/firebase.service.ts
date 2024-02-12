import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, switchMap } from 'rxjs';
import { collectionData, collection, doc, addDoc} from '@angular/fire/firestore';
import { deleteDoc, getFirestore, setDoc, getDoc, query } from 'firebase/firestore';
import { User } from '../interfaces/user';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL} from 'firebase/storage';
import { UtilsService } from './utils.service';
import { Match } from '../interfaces/match';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestore: AngularFirestore,
    private UtilSvc: UtilsService,
    ) { }

  // ================= AUTENTIFICACION ================= 

  //======= SEGURIDAD ==========
  getAuth(){
    return getAuth();
  }

  //=========== ACCEDER ==========
  signIn(user:User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  //=========== REGISTRARSE ==========
  signUp(user:User){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  //===== RECUPERAR LA CONTRASEÑA ======
  sendRecoveryEmail(email:string){
    return sendPasswordResetEmail(getAuth(),email)
  }

  //=========== CERRAR SESION =======

  signOut(){
    getAuth().signOut();
    localStorage.removeItem('user');
    this.UtilSvc.routerLink('/login')
  }

  // ================ BASE DE DATOS ========================= //

  //==== OBTENER DOCUMENTOS DE UNA COLLECION ====
  getCollectinData(path: string, collecstionQuery?:any){
    const ref = collection(getFirestore(),path);
    return collectionData(query(ref,collecstionQuery),{idField:'id'})
  }

  //========== OBTENER PARTIDOS ==========
  getAll(path:string): Observable<Match[]> {
    const characterRef = collection(this.firestore.firestore,path);
    return collectionData(characterRef, {idField: 'id'}) as Observable<Match[]>;

  }

  // ========== SETEAR UN DOCUMENTO ========
  setDocument(path: string, data:any){
    return setDoc(doc(getFirestore(),path), data) 
  }

  // ========== GET ========================
  async getDocument(path: string){
    return (await getDoc(doc(getFirestore(),path))).data();
  }

  // ======= AGREGAR UN DOCUMENTO ==========
  addDocument(path: string, data:any){
    return addDoc(collection(getFirestore(),path), data) 
  }

  //======== BORRAR DOCUMENTO ==============
  deleteDocument(path:string){
    return deleteDoc(doc(getFirestore(),path));
  }
}
