# Hangman Game

A modern, feature-rich implementation of the classic word-guessing game Hangman with multiple difficulty levels, hint system, theme switching, and comprehensive statistics tracking.

![Hangman Game](https://img.shields.io/badge/Game-Hangman-red)
![HTML5](https://img.shields.io/badge/HTML5-Canvas-orange)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![CSS3](https://img.shields.io/badge/CSS3-Variables-purple)

## 🎮 Features

### Core Gameplay
- **Classic Hangman mechanics** with 6 wrong guesses allowed
- **Three difficulty levels**: Easy (4-6 letters), Medium (7-10 letters), Hard (11+ letters)
- **Interactive virtual keyboard** with visual feedback
- **Physical keyboard support** for seamless gameplay
- **Hint system** with strategic penalties
- **Word reveal animation** with smooth transitions

### Visual & UI Features
- **Dual theme support**: Dark and Light themes with smooth transitions
- **Responsive design** that works on desktop, tablet, and mobile
- **Animated hangman drawing** that appears progressively
- **Visual feedback** for correct/incorrect guesses
- **Shake animation** for wrong guesses
- **Modal dialogs** for game outcomes

### Statistics & Progression
- **Win/Loss tracking** with persistent storage
- **High score system** based on consecutive wins
- **Real-time scoreboard** display
- **Local storage** for preserving game statistics and preferences

## 🎯 How to Play

1. **Start the Game**: The game begins automatically with a random word
2. **Choose Difficulty**: Select Easy, Medium, or Hard from the dropdown
3. **Make Guesses**: Click letters on the virtual keyboard or use your physical keyboard
4. **Use Hints**: Click "Get a Hint" for help (counts as a wrong guess)
5. **Win Condition**: Guess all letters before the hangman is complete
6. **Lose Condition**: Make 6 incorrect guesses and the hangman is drawn

## 🕹 Controls

### Mouse Controls
- **Click letters** on the virtual keyboard to make guesses
- **Click "Get a Hint"** button for assistance
- **Select difficulty** from the dropdown menu
- **Toggle theme** using the switch in the top-right

### Keyboard Controls
- **A-Z keys**: Make letter guesses
- **Mouse click**: All interactive elements are clickable

## 🛠 Installation & Setup

### Local Web Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

## 📁 Project Structure

```
Hangman/
├── index.html              # Main HTML structure
├── style.css              # Styling and themes
├── script.js              # Game logic and functionality
├── wordlist.txt           # Word database (user-provided)
├── images/               # Game outcome images
│   ├── victory.gif       # Victory animation
│   └── lost.gif          # Game over animation
├── LICENSE               # MIT License
└── README.md            # This documentation
```

## 🎨 Technical Features

### Theme System
- **CSS Custom Properties** for dynamic theming
- **Smooth transitions** between dark and light modes
- **Persistent theme preference** using localStorage
- **Accessible toggle switch** with proper ARIA labels

### Responsive Design
- **Mobile-first approach** with progressive enhancement
- **Flexible layout** that adapts to all screen sizes
- **Touch-friendly** interface elements
- **Optimized keyboard** layout for mobile devices

### Performance Optimizations
- **Efficient DOM manipulation** with minimal reflows
- **Event delegation** for keyboard interactions
- **Smooth animations** using CSS transforms
- **Lazy loading** of game assets

## 🎮 Game Mechanics

### Difficulty Levels
| Level | Word Length | Description |
|-------|-------------|-------------|
| **Easy** | 4-6 letters | Perfect for beginners |
| **Medium** | 7-10 letters | Balanced challenge |
| **Hard** | 11+ letters | For word game experts |

### Scoring System
- **Wins**: Incremented for each successful word completion
- **Losses**: Incremented for each failed attempt
- **High Score**: Tracks the highest number of consecutive wins
- **Statistics**: Persisted using browser localStorage

### Hint System
- **Strategic hints**: Reveals one random unguessed letter
- **Penalty system**: Counts as one incorrect guess
- **Smart availability**: Disabled when few guesses remain
- **Random selection**: Ensures unpredictable hint letters

## 🎯 Customization Guide

### Adding Custom Word Lists
Edit `wordlist.txt` to include your own words:
```javascript
// The game automatically filters words by length
// Supports any alphabetic characters
```

### Modifying Difficulty Settings
Edit the difficulty configuration in `script.js`:
```javascript
const difficultySettings = {
    easy: { min: 4, max: 6 },     // Modify ranges
    medium: { min: 7, max: 10 },  // as needed
    hard: { min: 11, max: 99 }
};
```

### Customizing Themes
Add new color schemes in `style.css`:
```css
:root {
    --custom-bg: #your-color;
    --custom-text: #your-color;
    /* Add your custom theme variables */
}
```

### Adjusting Game Rules
Modify game parameters in `script.js`:
```javascript
const gameState = {
    maxGuesses: 6,        // Change maximum wrong guesses
    // Other game settings
};
```

## 🔧 Browser Compatibility

- ✅ **Chrome** 60+ (Recommended)
- ✅ **Firefox** 55+
- ✅ **Safari** 12+
- ✅ **Edge** 79+
- ❌ **Internet Explorer** (Not supported)

## 📱 Mobile Support

The game is fully optimized for mobile devices with:
- **Touch-friendly** button sizes
- **Responsive layout** that adapts to portrait/landscape
- **Optimized keyboard** layout for smaller screens
- **Gesture support** for theme switching

## 🛡️ Error Handling

### Robust Word Loading
- **Graceful fallback** if wordlist.txt is missing
- **Format validation** for word list entries
- **Network error handling** with user feedback
- **Empty list detection** with helpful error messages

### User Experience
- **Input validation** prevents invalid guesses
- **Disabled state management** for used letters
- **Modal error dialogs** for critical issues
- **Accessibility features** with proper ARIA labels

## 🚀 Future Enhancements

- [ ] **Multiplayer support** with turn-based gameplay
- [ ] **Category-based words** (animals, countries, etc.)
- [ ] **Progressive difficulty** within games
- [ ] **Sound effects** and background music
- [ ] **Animation improvements** with CSS transitions
- [ ] **Word definitions** display on game completion
- [ ] **Leaderboard system** with online persistence
- [ ] **Custom word list uploads** via file input
- [ ] **Timed challenges** for additional difficulty
- [ ] **Achievement system** with unlockable rewards

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow **ES6+ JavaScript** standards
- Use **semantic HTML** and **accessible markup**
- Maintain **cross-browser compatibility**
- Include **comments** for complex logic
- Test on **multiple devices** and screen sizes
- Follow **mobile-first** responsive design principles

## 📋 Requirements

### Minimum Requirements
- Modern web browser with JavaScript enabled
- Local web server (recommended for file loading)
- `wordlist.txt` file with valid English words

### Recommended Setup
- Local development server
- Word list with 1000+ entries
- High-resolution display for best visual experience

## 🎪 Demo Instructions

1. Open `index.html` in your browser
2. Select your preferred difficulty level
3. Start guessing letters to reveal the hidden word
4. Use hints strategically when stuck
5. Try to beat your high score!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Ngô Hữu Lộc**

## 🙏 Acknowledgments

- Classic Hangman game inspiration
- Modern web development practices
- Accessibility guidelines and standards
- Community feedback and suggestions

---

*Challenge yourself with this modern take on the timeless word-guessing classic! 🎯📝*
