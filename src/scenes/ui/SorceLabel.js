import Phaser from 'phaser'

const formatScore = (score, best_score) => `Score: ${score}, Your record: ${best_score}`

export default class ScoreLabel extends Phaser.GameObjects.Text
{
   constructor(scene, x, y, score,best_score, style){
        super(scene, x, y, formatScore(score, best_score), style)
        this.score = score
        this.best_score = best_score
   }

   setScore(score){
       this.score  = score
       this.updateScoreText()
   }
   
   setBestScore(best_score){
       this.best_score  =  best_score
       this.updateScoreText()
   }

   add(points){
       this.setScore(this.score + points)
   }

   updateScoreText(){
       this.setText(formatScore(this.score, this.best_score))
   }

   getScore(){
       return this.score
   }
   

}