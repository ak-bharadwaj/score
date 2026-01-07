import AthleticsEventTypes from "../types/AthleticsEventTypes";

export const isOrderedAscending = (type: AthleticsEventTypes) => {
  switch (type) {
    case AthleticsEventTypes.MEN_5000:
    case AthleticsEventTypes.MEN_1500:
    case AthleticsEventTypes.WOMEN_1500:
    case AthleticsEventTypes.MEN_800:
    case AthleticsEventTypes.WOMEN_800:
    case AthleticsEventTypes.MEN_400:
    case AthleticsEventTypes.WOMEN_400:
    case AthleticsEventTypes.MEN_200:
    case AthleticsEventTypes.WOMEN_200:
    case AthleticsEventTypes.MEN_100:
    case AthleticsEventTypes.WOMEN_100:
    case AthleticsEventTypes.MEN_4X100:
    case AthleticsEventTypes.WOMEN_4X100:
    case AthleticsEventTypes.MEN_4X400:
    case AthleticsEventTypes.WOMEN_4X400:
    case AthleticsEventTypes.MEN_110_HURDLES:
    case AthleticsEventTypes.MEN_400_HURDLES:
      return true;
    case AthleticsEventTypes.MEN_HAMMER_THROW:
    case AthleticsEventTypes.MEN_DISK_THROW:
    case AthleticsEventTypes.WOMEN_DISK_THROW:
    case AthleticsEventTypes.MEN_POLE_VAULT:
    case AthleticsEventTypes.MEN_SHOT_PUT:
    case AthleticsEventTypes.WOMEN_SHOT_PUT:
    case AthleticsEventTypes.MEN_TRIPLE_JUMP:
    case AthleticsEventTypes.MEN_JAVELIN_THROW:
    case AthleticsEventTypes.WOMEN_JAVELIN_THROW:
    case AthleticsEventTypes.MEN_HIGH_JUMP:
    case AthleticsEventTypes.WOMEN_HIGH_JUMP:
    case AthleticsEventTypes.MEN_LONG_JUMP:
    case AthleticsEventTypes.WOMEN_LONG_JUMP:
      return false;
  }
};
