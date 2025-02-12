import { Component } from '@angular/core';

/*
 * 
 * Chat categories:
 * Game mechanics & improvements
 * Streamer's personal experiences
 * Chat engagement & opinions
 * Funny or frustrating moments
 * Upcoming game releases
 * Gaming industry trends
 * Personal gaming achievements
 * Stream setup & behind-the-scenes
 * Strategies & playstyles
 * Daily challenges & goals
 * Favorite gaming memories
 * 
  Give me a simple list of 50 short, direct, and open-ended questions in the category 'xxxxxxxxxxxxxx' that could apply to most video games.
  The questions should be engaging, relevant, and encourage thoughtful or creative responses.
  Do not ask questions that may only pertain to a certain category of games.
  Each must be
  - 8th grade reading level
  - 40 chars max
  - Real-Time Relevance
  - Specificity
  - Conciseness
  - Engagement-Driven
  - Emotionally Evocative
  - Streamer-Centric
 * 
 * 
*/

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  prompts: { [id: string]: Array<string> } = {
    "Game mechanics & improvements": [
      "One thing I would improve in this game..",
      "My favourite character in this game..",
      "My favourite mechanic in this game..",
      "I would improve this game by..",
      "A question I have for the devs..",
      "This game could learn from another game.."
    ],
    "Streamer's personal experiences": [
      "The best thing that happened today..",
      "A frustrating moment I had today..",
      "A funny moment I had today..",
      "A sad moment I had today..",
      "A happy moment I had today..",
      "A scary moment I had today..",
      "A triumphant moment I had today..",
      "An awkward moment I had today..",
      "A moment of growth I had today.."
    ],
    "Game/Chat engagement & opinions": [
      "My thought process in-game now..",
      "What I am doing in-game now..",
      "My strategy in-game right now..",
      "What I plan to do next in-game..",
      "What I learned not to do in-game..",
      "A great strategy I recently learned..",
      "Biggest fail in-game this week..",
      "Biggest win in-game this week.."
    ],
    "Game history": [
      "My first impression of this game..",
      "How this game changed over time..",
      "A frustrating moment in this game.."
    ],
    "Game Release": [
      "How I feel about the latest update..",
      "A new game I am excited about..",
      "What I know about the dev studio.."
    ],
    "Gaming industry trends": [
      "How this genre is doing in gaming.."
    ],
    "Personal gaming achievements": [
      "My biggest gaming achievement this week.."
    ],
    "Stream setup & behind-the-scenes": [
      "How my stream setup improved over time..",
      "Updates I have planned for my setup..",
      "Biggest lesson I learned from streaming..",
      "My favourite streamer right now.."
    ],
    "Strategies & playstyles": [
      "How my playstyle changed over time..",
      "My strategy in this game is.."
    ],
    "Daily challenges & goals": [
      "My goal for today's stream is..",
      "My long-term goal for this game.."
    ],
    "Favorite gaming memories": [
      "My favourite memory from this game..",
      "A funny story from playing with a friend.."
    ]
  };

  displayPromptsLength: number = 3;
  displayPrompts: Array<{
    phase: number,
    category: string,
    prompt: string,
  }> = [];

  displayTimer: number = 0;
  displayTime: number = 30 * 1000;
  displayTimerPhase: number = 0;
  displayTimerWidth: number = 0;
  displayTimerInterval: any;

  constructor() {
    this.init();
  }

  async init() {

    // Load the initial prompts (number of prompts = displayPromptsLength)
    for (let i = 0; i < this.displayPromptsLength; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      this.addRandomPrompt();
    }

    // Run timer on an interval every second
    this.displayTimerInterval = setInterval(() => {

      // Update the interval
      this.displayTimer += 1000;
      this.displayTimerWidth = (this.displayTimer / this.displayTime) * 100;
      if (this.displayTimerWidth > 100) this.displayTimerWidth = 100;

      // If we have reached the max time
      if (this.displayTimer > this.displayTime) {

        // Reset the timer
        this.hidePrompt(0);

        // Reset the loading bar
        this.displayTimerPhase = 1;
        setTimeout(() => {
          this.displayTimer = 0;
          this.displayTimerWidth = 0;
          setTimeout(() => {
            this.displayTimerPhase = 0;
          }, 100);
        }, 1000);

      }

    }, 1000);

  }

  async hidePrompt(index: number) {

    // Make the prompt phase 2
    this.displayPrompts[index].phase = 2;

    // wait 500ms
    await new Promise(resolve => setTimeout(resolve, 500));

    // Make the prompt phase 3
    this.displayPrompts[index].phase = 3;

    // Wait 500ms
    await new Promise(resolve => setTimeout(resolve, 500));

    // Remove the prompt from the displayPrompts array
    this.displayPrompts.splice(index, 1);

    // Add a new prompt
    this.addRandomPrompt();

  }

  addRandomPrompt() {

    // Get the categories that have prompts that haven't been displayed yet
    const availableCategories = Object.keys(this.prompts)
      .filter(category =>
        this.prompts[category].some(prompt =>
          !this.displayPrompts.some(dp => dp.prompt === prompt)
        )
      );

    // If there are no new prompts available, log a warning and return
    if (availableCategories.length === 0) {
      console.warn("No new unique prompts available.");
      return;
    }

    // Choose a random category from the available categories
    const randomCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];
    const availablePrompts = this.prompts[randomCategory].filter(
      prompt => !this.displayPrompts.some(dp => dp.prompt === prompt)
    );

    // If there are no new prompts available, log a warning and return
    if (availablePrompts.length === 0) {
      console.warn(`No new unique prompts available in category: ${randomCategory}`);
      return;
    }

    // Choose a random prompt from the available prompts
    const randomPrompt = availablePrompts[Math.floor(Math.random() * availablePrompts.length)];

    // Create a new prompt object
    let newPrompt = {
      phase: 0,
      category: randomCategory,
      prompt: randomPrompt
    };

    this.displayPrompts.push(newPrompt);

    // in 100 ms set the phase to 1
    setTimeout(() => {
      newPrompt.phase = 1;
    }, 100);

  }

}
