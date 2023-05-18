import Phaser from 'phaser'

const formatScore = (score, expected_solution) => `Score: ${score}, expected solution: ${expected_solution}`

export default class ScoreLabel extends Phaser.GameObjects.Text
{
   constructor(scene, x, y, score,expected_solution, style)
   {
       super(scene, x, y, formatScore(score, expected_solution), style)

        this.score = score
        this.expected_solution = expected_solution
   }

   setScore(score)
   {
       this.score  = score
       this.updateScoreText()
   }

   add(points)
   {
       this.setScore(this.score + points)
   }

   updateScoreText()
   {
       this.setText(formatScore(this.score, this.expected_solution))
   }

   getScore()
   {
       console.log(this.score)
       return this.score
   }
   

}