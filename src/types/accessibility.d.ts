declare namespace Accessibility {
  interface AccessibilityState {
    fontSize: number;
    highContrast: boolean;
    showTooltips: boolean;
  }

  interface AccessibilityControls {
    position?: 'left' | 'right';
  }

  interface KeyboardShortcuts {
    [key: string]: {
      key: string;
      description: string;
      action: () => void;
    };
  }

  interface AriaAttributes {
    'aria-label'?: string;
    'aria-describedby'?: string;
    'aria-hidden'?: boolean;
    'aria-expanded'?: boolean;
    'aria-pressed'?: boolean;
    'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
    role?: string;
    tabIndex?: number;
  }
}

export = Accessibility;
export as namespace Accessibility; 