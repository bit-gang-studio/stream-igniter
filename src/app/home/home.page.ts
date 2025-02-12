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
 * Give me a simple list of 30 short, direct, and open-ended questions in the category 'xxxxxxxxxxxxxx' that could apply to any and every video game. The questions should be engaging, relevant, and encourage thoughtful or creative responses.
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
      "How could movement feel more satisfying in this game?",
    ],
    "Streamer's personal experiences": [
      "What's missing that would improve player agency?",
      "How could the difficulty curve be improved?",
      "What small change would make a big impact?",
    ],
    "Chat engagement & opinions": [
      "What mechanic feels the most rewarding to use?",
      "What part of the gameplay feels unnecessary or frustrating?",
      "How could combat be made more engaging?",
    ],
    "Funny or frustrating moments": [
      "How could resource management be more strategic?",
      "What would make exploration more exciting?",
      "How could the pacing be adjusted for better flow?",
    ],
    "Upcoming game releases": [
      "What's the most underutilized mechanic in the game?",
      "How could the tutorial be more effective?",
      "What would make the AI feel smarter?",
    ],
    "Gaming industry trends": [
      "What mechanic feels outdated or clunky?",
      "How could interactions with NPCs be improved?",
    ],
    "Personal gaming achievements": [
      "How could the game encourage more player creativity?",
      "What system could be added to increase replayability?",
      "How could the UI be more intuitive?",
    ],
    "Stream setup & behind-the-scenes": [
      "How could movement and traversal be made more fun?",
      "What's one thing that feels too restrictive or limiting?",
    ],
    "Strategies & playstyles": [
      "What mechanic needs better feedback or clarity?",
      "How could the multiplayer experience be enhanced?",
      "What would make decision-making more meaningful?",
      "How could the game reward skill progression better?",
    ],
    "Daily challenges & goals": [
      "What's the biggest missed opportunity in the gameplay?",
      "How could environmental storytelling be more impactful?",
      "What mechanics could better support different playstyles?",
    ],
    "Favorite gaming memories": [
      "What aspect of the game could be more dynamic?",
      "How could the game better respond to player actions?",
      "How could randomness be balanced for fairness and fun?",
    ],
  };

  displayTimeMin: number = 10;
  displayVariance: number = 10;
  displayPromptsLength: number = 3;
  displayPrompts: Array<{
    category: string,
    prompt: string,
  }> = [];

  constructor() {
    this.init();
  }

  async init() {

    // Load the initial prompts (number of prompts = displayPromptsLength)
    for (let i = 0; i < this.displayPromptsLength; i++) {
      this.addRandomPrompt();
    }

  }

  hidePrompt(index: number) {

    this.displayPrompts.splice(index, 1);

    // Add a new prompt to replace the one that was removed
    this.addRandomPrompt();

  }

  addRandomPrompt() {
    const availableCategories = Object.keys(this.prompts)
      .filter(category =>
        this.prompts[category].some(prompt =>
          !this.displayPrompts.some(dp => dp.prompt === prompt)
        )
      );

    if (availableCategories.length === 0) {
      console.warn("No new unique prompts available.");
      return;
    }

    const randomCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];
    const availablePrompts = this.prompts[randomCategory].filter(
      prompt => !this.displayPrompts.some(dp => dp.prompt === prompt)
    );

    if (availablePrompts.length === 0) {
      console.warn(`No new unique prompts available in category: ${randomCategory}`);
      return;
    }

    const randomPrompt = availablePrompts[Math.floor(Math.random() * availablePrompts.length)];

    this.displayPrompts.push({
      category: randomCategory,
      prompt: randomPrompt
    });
  }


}
