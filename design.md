# Pattern Maker - Class Diagram

## Class Diagram
```mermaid
classDiagram
    %% Relationships
    MeasurementsWithUnits --> MeasurementInput : contains
    PatternPiece --> Measurements : uses
    PatternPiece --> PatternData : generates
    FrontBodicePiece --|> PatternPiece : extends
    BackBodicePiece --|> PatternPiece : extends
    SleevePiece --|> PatternPiece : extends
    PatternData --> Point : contains
    PatternPieceView --> PatternData : displays
    BlousePattern --> FrontBodicePiece : creates
    BlousePattern --> BackBodicePiece : creates
    BlousePattern --> SleevePiece : creates
    BlousePattern --> PatternPieceView : uses
    measurementsAtom --> measurementsInputAtom : derives from
    patternUtils --> Point : manipulates
    patternUtils --> Measurements : uses

    class Measurements {
        +number chest
        +number waist
        +number fullLength
        +number shoulder
        +number blouseLength
        +number armhole
        +number sleeveLength
        +number sleeveRound
        +number neckFront
        +number neckBack
        +number height
    }

    class MeasurementInput {
        +number value
        +string unit
    }

    class MeasurementsWithUnits {
        +MeasurementInput chest
        +MeasurementInput waist
        +MeasurementInput fullLength
        +MeasurementInput shoulder
        +MeasurementInput blouseLength
        +MeasurementInput armhole
        +MeasurementInput sleeveLength
        +MeasurementInput sleeveRound
        +MeasurementInput neckFront
        +MeasurementInput neckBack
        +MeasurementInput height
    }

    class PatternData {
        +object points
        +string outlinePath
        +string[] dartPaths
    }

    %% Pattern Logic Classes
    class PatternPiece {
        <<abstract>>
        +Measurements measurements
        +PatternData data
        +constructor(measurements)
        +calculateData()* PatternData
    }

    class FrontBodicePiece {
        +constructor(measurements)
        +calculateData() PatternData
    }

    class BackBodicePiece {
        +constructor(measurements)
        +calculateData() PatternData
    }

    class SleevePiece {
        +constructor(measurements)
        +calculateData() PatternData
    }

    %% UI Components
    class PatternPieceView {
        +PatternData data
        +string color
        +render()
    }

    class BlousePattern {
        +Measurements measurements
        +render()
    }

    %% State Management
    class measurementsInputAtom {
        +MeasurementsWithUnits
    }

    class measurementsAtom {
        +Measurements
    }

    %% Utility Functions
    class patternUtils {
        +SCALE number
        +DEFAULT_EASE object
        +getArmholeDepth(bust) number
        +getDartApex(bust, length, width) array
        +cm(value) number
        +Q(p0, p2, b, t) string
        +C(p0, p3, a, ta, b, tb) string
    }

```

## Class Descriptions

### Core Data Types
- **Point**: Represents 2D coordinates (x, y)
- **Measurements**: Core body measurements in centimeters
- **MeasurementInput**: Input structure with value and unit (cm/in)
- **MeasurementsWithUnits**: Container for all input measurements
- **PatternData**: Output structure containing pattern points, paths, and darts

### Pattern Logic Classes
- **PatternPiece**: Abstract base class defining pattern calculation structure
- **FrontBodicePiece**: Calculates front bodice pattern
- **BackBodicePiece**: Calculates back bodice pattern  
- **SleevePiece**: Calculates sleeve pattern

### UI Components
- **PatternPieceView**: Renders individual pattern pieces
- **BlousePattern**: Main component that creates and displays all pattern pieces

### State Management
- **measurementsInputAtom**: Jotai atom for user input measurements with units
- **measurementsAtom**: Computed atom that converts input to centimeters

### Utilities
- **patternUtils**: Helper functions for pattern calculations and SVG path generation

## Key Design Patterns

1. **Template Method**: `PatternPiece` defines the structure, concrete classes implement specific calculations
2. **Strategy**: Different pattern pieces implement different calculation strategies
3. **Observer**: Jotai atoms provide reactive state management
4. **Factory**: `BlousePattern` creates different pattern piece instances