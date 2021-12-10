import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private alertController: AlertController
  ) {}

  /** function called at first attempt */
  async firstAttempt() {
    const point: number = this.rollTwoDice();
    const result: number = this.getResult(point);

    if(result === 0 || result === 1) { // win or lose
      if(result === 0) { // lose the game
        const alertLose = await this.alertController.create({
          header: 'YOU LOSE !!',
          message: 'The sum of two dice is '+point,
          buttons: [
            {
              text: 'Okay',
              role: 'cancel'
            }
          ]
        });
        await alertLose.present();
      }
      else if(result === 1) { // win the game
        const alertWin = await this.alertController.create({
          header: 'YOU WIN !!',
          message: 'The sum of two dice is '+point,
          buttons: [
            {
              text: 'Okay',
              role: 'cancel'
            }
          ]
        });
        await alertWin.present();
      }
    }
    else { // not win or lose but get a point for next trial
      const alertTry = await this.alertController.create({
        header: 'YOU GET A POINT !!',
        message: 'The sum of two dice is '+point,
        buttons: [
          {
            text: 'CANCEL',
            role: 'cancel',
            cssClass: 'secondary'
          }, {
            text: 'TRY AGAIN',
            handler: () => {
              this.rollTillWinOrLose(result);
              // console.log('Confirm trial');
            }
          }
        ]
      });
      await alertTry.present();
    }
  }

  /** function rollDice */
  rollDice(): number {
  	return Math.floor(Math.random() * 6) + 1;
  }

  /** function printRoll prints the sum of the two dice */
  rollTwoDice(): number {

  	const dice1: number = this.rollDice();
  	const dice2: number = this.rollDice();
  	const sum: number = dice1 + dice2;

  	// console.log("You rolled " + dice1 + " + " + dice2 + " = " + sum)

  	return sum;
  }

  /** Method getResult returns the result */
  getResult(point: number): number {
    // If point is 2, 3, or 12 retrun 0, If point is 7 or 11 return 1
    switch(point) {
      case 2  :
      case 3  :
      case 12 :
        point = 0;
        break;
      case 7  :
      case 11 :
        point = 1;
        break;
    }

    return point;
  }

  /** Method naturalOrCraps returns true if you won lost. False otherwise */
  isNaturalOrCraps(result: number): boolean {
    return result === 0 || result === 1;
  }

  /** Method rollTillWinOrLose repeats rolling two dice until either
    a 7 or the same point value is rolled. then prints the result  */
  async rollTillWinOrLose(point: number) {

    const result = this.rollTwoDice();

    if(result !== point && result !== 7) {
      const alertTry = await this.alertController.create({
        header: 'YOU GET A POINT !!',
        message: 'The sum of two dice is '+result,
        buttons: [
          {
            text: 'CANCEL',
            role: 'cancel',
            cssClass: 'secondary'
          }, {
            text: 'TRY AGAIN',
            handler: () => {
              this.rollTillWinOrLose(point);
              // console.log('Confirm trial');
            }
          }
        ]
      });
      await alertTry.present();
    }
    else if(result === 7) { // If 7 is rolled, you lose. Otherwise, you win.
      const alertLose = await this.alertController.create({
        header: 'YOU LOSE !!',
        message: 'The sum of two dice is '+result,
        buttons: [
          {
            text: 'Okay',
            role: 'cancel'
          }
        ]
      });
      await alertLose.present();
    }
    else {
      const alertWin = await this.alertController.create({
        header: 'YOU WIN !!',
        message: 'The sum of two dice is '+result,
        buttons: [
          {
            text: 'Okay',
            role: 'cancel'
          }
        ]
      });
      await alertWin.present();
    }
  }

}
