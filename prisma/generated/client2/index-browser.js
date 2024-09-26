
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.20.0
 * Query Engine version: 69d742ee20b815d88e17e54db4a2a7a3b30324e3
 */
Prisma.prismaVersion = {
  client: "5.20.0",
  engine: "69d742ee20b815d88e17e54db4a2a7a3b30324e3"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  chatId: 'chatId',
  taps: 'taps',
  points: 'points',
  profit: 'profit',
  lastProfitDate: 'lastProfitDate',
  rechargeLimit: 'rechargeLimit',
  pointPerTap: 'pointPerTap',
  profitPerHour: 'profitPerHour',
  refillRate: 'refillRate',
  bonus: 'bonus',
  active: 'active',
  skin: 'skin',
  lastLogin: 'lastLogin',
  league: 'league',
  referralCount: 'referralCount',
  loginStreak: 'loginStreak',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  referredById: 'referredById'
};

exports.Prisma.AchievementCategoryScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.AchievementMilestoneScalarFieldEnum = {
  id: 'id',
  categoryId: 'categoryId',
  name: 'name',
  icon: 'icon',
  unlocked: 'unlocked'
};

exports.Prisma.UserAchievementScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  milestoneId: 'milestoneId'
};

exports.Prisma.DailyRewardScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  day: 'day',
  coins: 'coins',
  createdAt: 'createdAt'
};

exports.Prisma.CardScalarFieldEnum = {
  id: 'id',
  title: 'title',
  image: 'image',
  baseCost: 'baseCost',
  basePPH: 'basePPH',
  baseLevel: 'baseLevel',
  category: 'category',
  discription: 'discription',
  requiredCardId: 'requiredCardId',
  requiredCardLevel: 'requiredCardLevel',
  requiredCardTitle: 'requiredCardTitle'
};

exports.Prisma.UserCardScalarFieldEnum = {
  id: 'id',
  title: 'title',
  image: 'image',
  baseCost: 'baseCost',
  basePPH: 'basePPH',
  baseLevel: 'baseLevel',
  userId: 'userId',
  cardId: 'cardId',
  category: 'category',
  discription: 'discription'
};

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  identifier: 'identifier',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.AuthenticatorScalarFieldEnum = {
  credentialID: 'credentialID',
  userId: 'userId',
  providerAccountId: 'providerAccountId',
  credentialPublicKey: 'credentialPublicKey',
  counter: 'counter',
  credentialDeviceType: 'credentialDeviceType',
  credentialBackedUp: 'credentialBackedUp',
  transports: 'transports'
};

exports.Prisma.LeaguesScalarFieldEnum = {
  id: 'id',
  name: 'name',
  minEntry: 'minEntry',
  pointLimit: 'pointLimit',
  trophy: 'trophy',
  entryReward: 'entryReward'
};

exports.Prisma.PointsScalarFieldEnum = {
  id: 'id',
  user: 'user',
  points: 'points',
  league: 'league',
  autominer: 'autominer',
  tapLimit: 'tapLimit',
  lastTap: 'lastTap'
};

exports.Prisma.BonusterScalarFieldEnum = {
  id: 'id',
  chatId: 'chatId',
  energy: 'energy',
  energyCost: 'energyCost',
  energylevel: 'energylevel',
  multiClickLevel: 'multiClickLevel',
  multiClickCost: 'multiClickCost'
};

exports.Prisma.DailyBoostersScalarFieldEnum = {
  id: 'id',
  name: 'name',
  count: 'count',
  icon: 'icon'
};

exports.Prisma.TaskCategoriesScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.TasksScalarFieldEnum = {
  id: 'id',
  category: 'category',
  name: 'name',
  points: 'points',
  link: 'link',
  icon: 'icon'
};

exports.Prisma.TasksCompletionScalarFieldEnum = {
  id: 'id',
  taskId: 'taskId',
  userId: 'userId',
  points: 'points'
};

exports.Prisma.YouTubeScalarFieldEnum = {
  id: 'id',
  category: 'category',
  name: 'name',
  points: 'points',
  link: 'link',
  icon: 'icon'
};

exports.Prisma.YouTubeCompletionScalarFieldEnum = {
  id: 'id',
  taskId: 'taskId',
  userId: 'userId',
  points: 'points'
};

exports.Prisma.SkinsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  image: 'image',
  cost: 'cost',
  featured: 'featured',
  league: 'league'
};

exports.Prisma.UserSkinScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  skinId: 'skinId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};


exports.Prisma.ModelName = {
  User: 'User',
  AchievementCategory: 'AchievementCategory',
  AchievementMilestone: 'AchievementMilestone',
  UserAchievement: 'UserAchievement',
  DailyReward: 'DailyReward',
  Card: 'Card',
  UserCard: 'UserCard',
  Account: 'Account',
  Session: 'Session',
  VerificationToken: 'VerificationToken',
  Authenticator: 'Authenticator',
  Leagues: 'Leagues',
  Points: 'Points',
  Bonuster: 'Bonuster',
  DailyBoosters: 'DailyBoosters',
  TaskCategories: 'TaskCategories',
  Tasks: 'Tasks',
  TasksCompletion: 'TasksCompletion',
  YouTube: 'YouTube',
  YouTubeCompletion: 'YouTubeCompletion',
  Skins: 'Skins',
  UserSkin: 'UserSkin'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
