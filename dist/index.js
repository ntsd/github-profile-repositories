/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(37));
const utils_1 = __nccwpck_require__(278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 186:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(351);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(278);
const os = __importStar(__nccwpck_require__(37));
const path = __importStar(__nccwpck_require__(17));
const oidc_utils_1 = __nccwpck_require__(41);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
function getIDToken(aud) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
}
exports.getIDToken = getIDToken;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(147));
const os = __importStar(__nccwpck_require__(37));
const utils_1 = __nccwpck_require__(278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 41:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcClient = void 0;
const http_client_1 = __nccwpck_require__(925);
const auth_1 = __nccwpck_require__(702);
const core_1 = __nccwpck_require__(186);
class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
                .getJson(id_token_url)
                .catch(error => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.result.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
                throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
        });
    }
    static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // New ID Token is requested from action service
                let id_token_url = OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                core_1.debug(`ID token url is ${id_token_url}`);
                const id_token = yield OidcClient.getCall(id_token_url);
                core_1.setSecret(id_token);
                return id_token;
            }
            catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
exports.OidcClient = OidcClient;
//# sourceMappingURL=oidc-utils.js.map

/***/ }),

/***/ 278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
        return {};
    }
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
exports.toCommandProperties = toCommandProperties;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 702:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        options.headers['Authorization'] =
            'Basic ' +
                Buffer.from(this.username + ':' + this.password).toString('base64');
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        options.headers['Authorization'] = 'Bearer ' + this.token;
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        options.headers['Authorization'] =
            'Basic ' + Buffer.from('PAT:' + this.token).toString('base64');
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;


/***/ }),

/***/ 925:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const http = __nccwpck_require__(685);
const https = __nccwpck_require__(687);
const pm = __nccwpck_require__(443);
let tunnel;
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return new Promise(async (resolve, reject) => {
            let output = Buffer.alloc(0);
            this.message.on('data', (chunk) => {
                output = Buffer.concat([output, chunk]);
            });
            this.message.on('end', () => {
                resolve(output.toString());
            });
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    let parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
    }
    get(requestUrl, additionalHeaders) {
        return this.request('GET', requestUrl, null, additionalHeaders || {});
    }
    del(requestUrl, additionalHeaders) {
        return this.request('DELETE', requestUrl, null, additionalHeaders || {});
    }
    post(requestUrl, data, additionalHeaders) {
        return this.request('POST', requestUrl, data, additionalHeaders || {});
    }
    patch(requestUrl, data, additionalHeaders) {
        return this.request('PATCH', requestUrl, data, additionalHeaders || {});
    }
    put(requestUrl, data, additionalHeaders) {
        return this.request('PUT', requestUrl, data, additionalHeaders || {});
    }
    head(requestUrl, additionalHeaders) {
        return this.request('HEAD', requestUrl, null, additionalHeaders || {});
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    async getJson(requestUrl, additionalHeaders = {}) {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        let res = await this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    async request(verb, requestUrl, data, headers) {
        if (this._disposed) {
            throw new Error('Client has already been disposed.');
        }
        let parsedUrl = new URL(requestUrl);
        let info = this._prepareRequest(verb, parsedUrl, headers);
        // Only perform retries on reads since writes may not be idempotent.
        let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1
            ? this._maxRetries + 1
            : 1;
        let numTries = 0;
        let response;
        while (numTries < maxTries) {
            response = await this.requestRaw(info, data);
            // Check if it's an authentication challenge
            if (response &&
                response.message &&
                response.message.statusCode === HttpCodes.Unauthorized) {
                let authenticationHandler;
                for (let i = 0; i < this.handlers.length; i++) {
                    if (this.handlers[i].canHandleAuthentication(response)) {
                        authenticationHandler = this.handlers[i];
                        break;
                    }
                }
                if (authenticationHandler) {
                    return authenticationHandler.handleAuthentication(this, info, data);
                }
                else {
                    // We have received an unauthorized response but have no handlers to handle it.
                    // Let the response return to the caller.
                    return response;
                }
            }
            let redirectsRemaining = this._maxRedirects;
            while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 &&
                this._allowRedirects &&
                redirectsRemaining > 0) {
                const redirectUrl = response.message.headers['location'];
                if (!redirectUrl) {
                    // if there's no location to redirect to, we won't
                    break;
                }
                let parsedRedirectUrl = new URL(redirectUrl);
                if (parsedUrl.protocol == 'https:' &&
                    parsedUrl.protocol != parsedRedirectUrl.protocol &&
                    !this._allowRedirectDowngrade) {
                    throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                }
                // we need to finish reading the response before reassigning response
                // which will leak the open socket.
                await response.readBody();
                // strip authorization header if redirected to a different hostname
                if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                    for (let header in headers) {
                        // header names are case insensitive
                        if (header.toLowerCase() === 'authorization') {
                            delete headers[header];
                        }
                    }
                }
                // let's make the request with the new redirectUrl
                info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                response = await this.requestRaw(info, data);
                redirectsRemaining--;
            }
            if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
                // If not a retry code, return immediately instead of retrying
                return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
                await response.readBody();
                await this._performExponentialBackoff(numTries);
            }
        }
        return response;
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return new Promise((resolve, reject) => {
            let callbackForResult = function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            };
            this.requestRawWithCallback(info, data, callbackForResult);
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        let socket;
        if (typeof data === 'string') {
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        };
        let req = info.httpModule.request(info.options, (msg) => {
            let res = new HttpClientResponse(msg);
            handleResult(null, res);
        });
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error('Request timeout: ' + info.options.path), null);
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err, null);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        let parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            this.handlers.forEach(handler => {
                handler.prepareRequest(info.options);
            });
        }
        return info;
    }
    _mergeHeaders(headers) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        let proxyUrl = pm.getProxyUrl(parsedUrl);
        let useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (!!agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (!!this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
            // If using proxy, need tunnel
            if (!tunnel) {
                tunnel = __nccwpck_require__(294);
            }
            const agentOptions = {
                maxSockets: maxSockets,
                keepAlive: this._keepAlive,
                proxy: {
                    ...((proxyUrl.username || proxyUrl.password) && {
                        proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                    }),
                    host: proxyUrl.hostname,
                    port: proxyUrl.port
                }
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets: maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    static dateTimeDeserializer(key, value) {
        if (typeof value === 'string') {
            let a = new Date(value);
            if (!isNaN(a.valueOf())) {
                return a;
            }
        }
        return value;
    }
    async _processResponse(res, options) {
        return new Promise(async (resolve, reject) => {
            const statusCode = res.message.statusCode;
            const response = {
                statusCode: statusCode,
                result: null,
                headers: {}
            };
            // not found leads to null obj returned
            if (statusCode == HttpCodes.NotFound) {
                resolve(response);
            }
            let obj;
            let contents;
            // get the result from the body
            try {
                contents = await res.readBody();
                if (contents && contents.length > 0) {
                    if (options && options.deserializeDates) {
                        obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
                    }
                    else {
                        obj = JSON.parse(contents);
                    }
                    response.result = obj;
                }
                response.headers = res.message.headers;
            }
            catch (err) {
                // Invalid resource (contents not json);  leaving result obj null
            }
            // note that 3xx redirects are handled by the http layer.
            if (statusCode > 299) {
                let msg;
                // if exception/error in body, attempt to get better error
                if (obj && obj.message) {
                    msg = obj.message;
                }
                else if (contents && contents.length > 0) {
                    // it may be the case that the exception is in the body message as string
                    msg = contents;
                }
                else {
                    msg = 'Failed request: (' + statusCode + ')';
                }
                let err = new HttpClientError(msg, statusCode);
                err.result = response.result;
                reject(err);
            }
            else {
                resolve(response);
            }
        });
    }
}
exports.HttpClient = HttpClient;


/***/ }),

/***/ 443:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function getProxyUrl(reqUrl) {
    let usingSsl = reqUrl.protocol === 'https:';
    let proxyUrl;
    if (checkBypass(reqUrl)) {
        return proxyUrl;
    }
    let proxyVar;
    if (usingSsl) {
        proxyVar = process.env['https_proxy'] || process.env['HTTPS_PROXY'];
    }
    else {
        proxyVar = process.env['http_proxy'] || process.env['HTTP_PROXY'];
    }
    if (proxyVar) {
        proxyUrl = new URL(proxyVar);
    }
    return proxyUrl;
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    let noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    let upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (let upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperReqHosts.some(x => x === upperNoProxyItem)) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;


/***/ }),

/***/ 385:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
/*
 * liquidjs@9.28.4, https://github.com/harttle/liquidjs
 * (c) 2016-2021 harttle
 * Released under the MIT License.
 */


Object.defineProperty(exports, "__esModule", ({ value: true }));

var path = __nccwpck_require__(17);
var fs$1 = __nccwpck_require__(147);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var Drop = /** @class */ (function () {
    function Drop() {
    }
    Drop.prototype.valueOf = function () {
        return undefined;
    };
    Drop.prototype.liquidMethodMissing = function (key) {
        return undefined;
    };
    return Drop;
}());

var toStr = Object.prototype.toString;
var toLowerCase = String.prototype.toLowerCase;
function isString(value) {
    return typeof value === 'string';
}
function isFunction(value) {
    return typeof value === 'function';
}
function escapeRegex(str) {
    return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}
function promisify(fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            fn.apply(void 0, __spread(args, [function (err, result) {
                    err ? reject(err) : resolve(result);
                }]));
        });
    };
}
function stringify(value) {
    value = toValue(value);
    if (isString(value))
        return value;
    if (isNil(value))
        return '';
    return String(value);
}
function toValue(value) {
    return value instanceof Drop ? value.valueOf() : value;
}
function isNumber(value) {
    return typeof value === 'number';
}
function toLiquid(value) {
    if (value && isFunction(value.toLiquid))
        return toLiquid(value.toLiquid());
    return value;
}
function isNil(value) {
    return value == null;
}
function isArray(value) {
    // be compatible with IE 8
    return toStr.call(value) === '[object Array]';
}
/*
 * Iterates over own enumerable string keyed properties of an object and invokes iteratee for each property.
 * The iteratee is invoked with three arguments: (value, key, object).
 * Iteratee functions may exit iteration early by explicitly returning false.
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @return {Object} Returns object.
 */
function forOwn(object, iteratee) {
    object = object || {};
    for (var k in object) {
        if (object.hasOwnProperty(k)) {
            if (iteratee(object[k], k, object) === false)
                break;
        }
    }
    return object;
}
function last(arr) {
    return arr[arr.length - 1];
}
/*
 * Checks if value is the language type of Object.
 * (e.g. arrays, functions, objects, regexes, new Number(0), and new String(''))
 * @param {any} value The value to check.
 * @return {Boolean} Returns true if value is an object, else false.
 */
function isObject(value) {
    var type = typeof value;
    return value !== null && (type === 'object' || type === 'function');
}
function range(start, stop, step) {
    if (step === void 0) { step = 1; }
    var arr = [];
    for (var i = start; i < stop; i += step) {
        arr.push(i);
    }
    return arr;
}
function padStart(str, length, ch) {
    if (ch === void 0) { ch = ' '; }
    return pad(str, length, ch, function (str, ch) { return ch + str; });
}
function padEnd(str, length, ch) {
    if (ch === void 0) { ch = ' '; }
    return pad(str, length, ch, function (str, ch) { return str + ch; });
}
function pad(str, length, ch, add) {
    str = String(str);
    var n = length - str.length;
    while (n-- > 0)
        str = add(str, ch);
    return str;
}
function identify(val) {
    return val;
}
function snakeCase(str) {
    return str.replace(/(\w?)([A-Z])/g, function (_, a, b) { return (a ? a + '_' : '') + b.toLowerCase(); });
}
function changeCase(str) {
    var hasLowerCase = __spread(str).some(function (ch) { return ch >= 'a' && ch <= 'z'; });
    return hasLowerCase ? str.toUpperCase() : str.toLowerCase();
}
function ellipsis(str, N) {
    return str.length > N ? str.substr(0, N - 3) + '...' : str;
}
// compare string in case-insensitive way, undefined values to the tail
function caseInsensitiveCompare(a, b) {
    if (a == null && b == null)
        return 0;
    if (a == null)
        return 1;
    if (b == null)
        return -1;
    a = toLowerCase.call(a);
    b = toLowerCase.call(b);
    if (a < b)
        return -1;
    if (a > b)
        return 1;
    return 0;
}

var Node = /** @class */ (function () {
    function Node(key, value, next, prev) {
        this.key = key;
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
    return Node;
}());
var LRU = /** @class */ (function () {
    function LRU(limit, size) {
        if (size === void 0) { size = 0; }
        this.limit = limit;
        this.size = size;
        this.cache = {};
        this.head = new Node('HEAD', null, null, null);
        this.tail = new Node('TAIL', null, null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    LRU.prototype.write = function (key, value) {
        if (this.cache[key]) {
            this.cache[key].value = value;
        }
        else {
            var node = new Node(key, value, this.head.next, this.head);
            this.head.next.prev = node;
            this.head.next = node;
            this.cache[key] = node;
            this.size++;
            this.ensureLimit();
        }
    };
    LRU.prototype.read = function (key) {
        if (!this.cache[key])
            return;
        var value = this.cache[key].value;
        this.remove(key);
        this.write(key, value);
        return value;
    };
    LRU.prototype.remove = function (key) {
        var node = this.cache[key];
        node.prev.next = node.next;
        node.next.prev = node.prev;
        delete this.cache[key];
        this.size--;
    };
    LRU.prototype.clear = function () {
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.size = 0;
        this.cache = {};
    };
    LRU.prototype.ensureLimit = function () {
        if (this.size > this.limit)
            this.remove(this.tail.prev.key);
    };
    return LRU;
}());

var statAsync = promisify(fs$1.stat);
var readFileAsync = promisify(fs$1.readFile);
function exists(filepath) {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, statAsync(filepath)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true];
                case 2:
                    err_1 = _a.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function readFile(filepath) {
    return readFileAsync(filepath, 'utf8');
}
function existsSync(filepath) {
    try {
        fs$1.statSync(filepath);
        return true;
    }
    catch (err) {
        return false;
    }
}
function readFileSync(filepath) {
    return fs$1.readFileSync(filepath, 'utf8');
}
function resolve(root, file, ext) {
    if (!path.extname(file))
        file += ext;
    return path.resolve(root, file);
}
function fallback(file) {
    try {
        return require.resolve(file);
    }
    catch (e) { }
}
function dirname(filepath) {
    return path.dirname(filepath);
}
function contains(root, file) {
    root = path.resolve(root);
    root = root.endsWith(path.sep) ? root : root + path.sep;
    return file.startsWith(root);
}

var fs = /*#__PURE__*/Object.freeze({
    exists: exists,
    readFile: readFile,
    existsSync: existsSync,
    readFileSync: readFileSync,
    resolve: resolve,
    fallback: fallback,
    dirname: dirname,
    contains: contains,
    sep: path.sep
});

function isComparable(arg) {
    return arg && isFunction(arg.equals);
}

function isTruthy(val, ctx) {
    return !isFalsy(val, ctx);
}
function isFalsy(val, ctx) {
    if (ctx.opts.jsTruthy) {
        return !val;
    }
    else {
        return val === false || undefined === val || val === null;
    }
}

var defaultOperators = {
    '==': function (l, r) {
        if (isComparable(l))
            return l.equals(r);
        if (isComparable(r))
            return r.equals(l);
        return l === r;
    },
    '!=': function (l, r) {
        if (isComparable(l))
            return !l.equals(r);
        if (isComparable(r))
            return !r.equals(l);
        return l !== r;
    },
    '>': function (l, r) {
        if (isComparable(l))
            return l.gt(r);
        if (isComparable(r))
            return r.lt(l);
        return l > r;
    },
    '<': function (l, r) {
        if (isComparable(l))
            return l.lt(r);
        if (isComparable(r))
            return r.gt(l);
        return l < r;
    },
    '>=': function (l, r) {
        if (isComparable(l))
            return l.geq(r);
        if (isComparable(r))
            return r.leq(l);
        return l >= r;
    },
    '<=': function (l, r) {
        if (isComparable(l))
            return l.leq(r);
        if (isComparable(r))
            return r.geq(l);
        return l <= r;
    },
    'contains': function (l, r) {
        return l && isFunction(l.indexOf) ? l.indexOf(r) > -1 : false;
    },
    'and': function (l, r, ctx) { return isTruthy(l, ctx) && isTruthy(r, ctx); },
    'or': function (l, r, ctx) { return isTruthy(l, ctx) || isTruthy(r, ctx); }
};

// **DO NOT CHANGE THIS FILE**
//
// This file is generated by bin/character-gen.js
// bitmask character types to boost performance
var TYPES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 4, 4, 4, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 2, 8, 0, 0, 0, 0, 8, 0, 0, 0, 64, 0, 65, 0, 0, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 0, 0, 2, 2, 2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
var IDENTIFIER = 1;
var BLANK = 4;
var QUOTE = 8;
var INLINE_BLANK = 16;
var NUMBER = 32;
var SIGN = 64;
TYPES[160] = TYPES[5760] = TYPES[6158] = TYPES[8192] = TYPES[8193] = TYPES[8194] = TYPES[8195] = TYPES[8196] = TYPES[8197] = TYPES[8198] = TYPES[8199] = TYPES[8200] = TYPES[8201] = TYPES[8202] = TYPES[8232] = TYPES[8233] = TYPES[8239] = TYPES[8287] = TYPES[12288] = BLANK;

function createTrie(operators) {
    var e_1, _a;
    var trie = {};
    try {
        for (var _b = __values(Object.entries(operators)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), name_1 = _d[0], handler = _d[1];
            var node = trie;
            for (var i = 0; i < name_1.length; i++) {
                var c = name_1[i];
                node[c] = node[c] || {};
                if (i === name_1.length - 1 && (TYPES[name_1.charCodeAt(i)] & IDENTIFIER)) {
                    node[c].needBoundary = true;
                }
                node = node[c];
            }
            node.handler = handler;
            node.end = true;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return trie;
}

var defaultOptions = {
    root: ['.'],
    layouts: ['.'],
    partials: ['.'],
    relativeReference: true,
    cache: undefined,
    extname: '',
    fs: fs,
    dynamicPartials: true,
    jsTruthy: false,
    trimTagRight: false,
    trimTagLeft: false,
    trimOutputRight: false,
    trimOutputLeft: false,
    greedy: true,
    tagDelimiterLeft: '{%',
    tagDelimiterRight: '%}',
    outputDelimiterLeft: '{{',
    outputDelimiterRight: '}}',
    preserveTimezones: false,
    strictFilters: false,
    strictVariables: false,
    lenientIf: false,
    globals: {},
    keepOutputType: false,
    operators: defaultOperators,
    operatorsTrie: createTrie(defaultOperators)
};
function normalize(options) {
    if (options.hasOwnProperty('operators')) {
        options.operatorsTrie = createTrie(options.operators);
    }
    if (options.hasOwnProperty('root')) {
        if (!options.hasOwnProperty('partials'))
            options.partials = options.root;
        if (!options.hasOwnProperty('layouts'))
            options.layouts = options.root;
    }
    if (options.hasOwnProperty('cache')) {
        var cache = void 0;
        if (typeof options.cache === 'number')
            cache = options.cache > 0 ? new LRU(options.cache) : undefined;
        else if (typeof options.cache === 'object')
            cache = options.cache;
        else
            cache = options.cache ? new LRU(1024) : undefined;
        options.cache = cache;
    }
    options = __assign({}, defaultOptions, options);
    if (!options.fs.dirname && options.relativeReference) {
        console.warn('[LiquidJS] `fs.dirname` is required for relativeReference, set relativeReference to `false` to suppress this warning, or provide implementation for `fs.dirname`');
        options.relativeReference = false;
    }
    options.root = normalizeDirectoryList(options.root);
    options.partials = normalizeDirectoryList(options.partials);
    options.layouts = normalizeDirectoryList(options.layouts);
    return options;
}
function normalizeDirectoryList(value) {
    var list = [];
    if (isArray(value))
        list = value;
    if (isString(value))
        list = [value];
    return list;
}

var LiquidError = /** @class */ (function (_super) {
    __extends(LiquidError, _super);
    function LiquidError(err, token) {
        var _this = _super.call(this, err.message) || this;
        _this.originalError = err;
        _this.token = token;
        _this.context = '';
        return _this;
    }
    LiquidError.prototype.update = function () {
        var err = this.originalError;
        this.context = mkContext(this.token);
        this.message = mkMessage(err.message, this.token);
        this.stack = this.message + '\n' + this.context +
            '\n' + this.stack + '\nFrom ' + err.stack;
    };
    return LiquidError;
}(Error));
var TokenizationError = /** @class */ (function (_super) {
    __extends(TokenizationError, _super);
    function TokenizationError(message, token) {
        var _this = _super.call(this, new Error(message), token) || this;
        _this.name = 'TokenizationError';
        _super.prototype.update.call(_this);
        return _this;
    }
    return TokenizationError;
}(LiquidError));
var ParseError = /** @class */ (function (_super) {
    __extends(ParseError, _super);
    function ParseError(err, token) {
        var _this = _super.call(this, err, token) || this;
        _this.name = 'ParseError';
        _this.message = err.message;
        _super.prototype.update.call(_this);
        return _this;
    }
    return ParseError;
}(LiquidError));
var RenderError = /** @class */ (function (_super) {
    __extends(RenderError, _super);
    function RenderError(err, tpl) {
        var _this = _super.call(this, err, tpl.token) || this;
        _this.name = 'RenderError';
        _this.message = err.message;
        _super.prototype.update.call(_this);
        return _this;
    }
    RenderError.is = function (obj) {
        return obj.name === 'RenderError';
    };
    return RenderError;
}(LiquidError));
var UndefinedVariableError = /** @class */ (function (_super) {
    __extends(UndefinedVariableError, _super);
    function UndefinedVariableError(err, token) {
        var _this = _super.call(this, err, token) || this;
        _this.name = 'UndefinedVariableError';
        _this.message = err.message;
        _super.prototype.update.call(_this);
        return _this;
    }
    return UndefinedVariableError;
}(LiquidError));
// only used internally; raised where we don't have token information,
// so it can't be an UndefinedVariableError.
var InternalUndefinedVariableError = /** @class */ (function (_super) {
    __extends(InternalUndefinedVariableError, _super);
    function InternalUndefinedVariableError(variableName) {
        var _this = _super.call(this, "undefined variable: " + variableName) || this;
        _this.name = 'InternalUndefinedVariableError';
        _this.variableName = variableName;
        return _this;
    }
    return InternalUndefinedVariableError;
}(Error));
var AssertionError = /** @class */ (function (_super) {
    __extends(AssertionError, _super);
    function AssertionError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'AssertionError';
        _this.message = message + '';
        return _this;
    }
    return AssertionError;
}(Error));
function mkContext(token) {
    var _a = __read(token.getPosition(), 1), line = _a[0];
    var lines = token.input.split('\n');
    var begin = Math.max(line - 2, 1);
    var end = Math.min(line + 3, lines.length);
    var context = range(begin, end + 1)
        .map(function (lineNumber) {
        var indicator = (lineNumber === line) ? '>> ' : '   ';
        var num = padStart(String(lineNumber), String(end).length);
        var text = lines[lineNumber - 1];
        return "" + indicator + num + "| " + text;
    })
        .join('\n');
    return context;
}
function mkMessage(msg, token) {
    if (token.file)
        msg += ", file:" + token.file;
    var _a = __read(token.getPosition(), 2), line = _a[0], col = _a[1];
    msg += ", line:" + line + ", col:" + col;
    return msg;
}

var Context = /** @class */ (function () {
    function Context(env, opts, sync) {
        if (env === void 0) { env = {}; }
        if (opts === void 0) { opts = defaultOptions; }
        if (sync === void 0) { sync = false; }
        /**
         * insert a Context-level empty scope,
         * for tags like {% capture %} {% assign %} to operate
         */
        this.scopes = [{}];
        this.registers = {};
        this.sync = sync;
        this.opts = opts;
        this.globals = opts.globals;
        this.environments = env;
    }
    Context.prototype.getRegister = function (key) {
        return (this.registers[key] = this.registers[key] || {});
    };
    Context.prototype.setRegister = function (key, value) {
        return (this.registers[key] = value);
    };
    Context.prototype.saveRegister = function () {
        var _this = this;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        return keys.map(function (key) { return [key, _this.getRegister(key)]; });
    };
    Context.prototype.restoreRegister = function (keyValues) {
        var _this = this;
        return keyValues.forEach(function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            return _this.setRegister(key, value);
        });
    };
    Context.prototype.getAll = function () {
        return __spread([this.globals, this.environments], this.scopes).reduce(function (ctx, val) { return __assign(ctx, val); }, {});
    };
    Context.prototype.get = function (paths) {
        var scope = this.findScope(paths[0]);
        return this.getFromScope(scope, paths);
    };
    Context.prototype.getFromScope = function (scope, paths) {
        var _this = this;
        if (typeof paths === 'string')
            paths = paths.split('.');
        return paths.reduce(function (scope, path) {
            scope = readProperty(scope, path);
            if (isNil(scope) && _this.opts.strictVariables) {
                throw new InternalUndefinedVariableError(path);
            }
            return scope;
        }, scope);
    };
    Context.prototype.push = function (ctx) {
        return this.scopes.push(ctx);
    };
    Context.prototype.pop = function () {
        return this.scopes.pop();
    };
    Context.prototype.bottom = function () {
        return this.scopes[0];
    };
    Context.prototype.findScope = function (key) {
        for (var i = this.scopes.length - 1; i >= 0; i--) {
            var candidate = this.scopes[i];
            if (key in candidate)
                return candidate;
        }
        if (key in this.environments)
            return this.environments;
        return this.globals;
    };
    return Context;
}());
function readProperty(obj, key) {
    if (isNil(obj))
        return obj;
    obj = toLiquid(obj);
    if (isFunction(obj[key]))
        return obj[key]();
    if (obj instanceof Drop) {
        if (obj.hasOwnProperty(key))
            return obj[key];
        return obj.liquidMethodMissing(key);
    }
    if (key === 'size')
        return readSize(obj);
    if (key === 'first')
        return readFirst(obj);
    if (key === 'last')
        return readLast(obj);
    return obj[key];
}
function readFirst(obj) {
    if (isArray(obj))
        return obj[0];
    return obj['first'];
}
function readLast(obj) {
    if (isArray(obj))
        return obj[obj.length - 1];
    return obj['last'];
}
function readSize(obj) {
    if (isArray(obj) || isString(obj))
        return obj.length;
    return obj['size'];
}

function assert(predicate, message) {
    if (!predicate) {
        var msg = typeof message === 'function'
            ? message()
            : (message || "expect " + predicate + " to be true");
        throw new AssertionError(msg);
    }
}

var LookupType;
(function (LookupType) {
    LookupType["Partials"] = "partials";
    LookupType["Layouts"] = "layouts";
    LookupType["Root"] = "root";
})(LookupType || (LookupType = {}));
var Loader = /** @class */ (function () {
    function Loader(options) {
        this.options = options;
        if (options.relativeReference) {
            var sep = options.fs.sep;
            assert(sep, '`fs.sep` is required for relative reference');
            var rRelativePath_1 = new RegExp(['.' + sep, '..' + sep, './', '../'].map(function (prefix) { return escapeRegex(prefix); }).join('|'));
            this.shouldLoadRelative = function (referencedFile) { return rRelativePath_1.test(referencedFile); };
        }
        else {
            this.shouldLoadRelative = function (referencedFile) { return false; };
        }
        this.contains = this.options.fs.contains || (function () { return true; });
    }
    Loader.prototype.lookup = function (file, type, sync, currentFile) {
        var fs, dirs, _a, _b, filepath, _c, e_1_1;
        var e_1, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    fs = this.options.fs;
                    dirs = this.options[type];
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 8, 9, 10]);
                    _a = __values(this.candidates(file, dirs, currentFile, type !== LookupType.Root)), _b = _a.next();
                    _e.label = 2;
                case 2:
                    if (!!_b.done) return [3 /*break*/, 7];
                    filepath = _b.value;
                    if (!sync) return [3 /*break*/, 3];
                    _c = fs.existsSync(filepath);
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, fs.exists(filepath)];
                case 4:
                    _c = _e.sent();
                    _e.label = 5;
                case 5:
                    if (_c)
                        return [2 /*return*/, filepath];
                    _e.label = 6;
                case 6:
                    _b = _a.next();
                    return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 10];
                case 8:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 10];
                case 9:
                    try {
                        if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 10: throw this.lookupError(file, dirs);
            }
        });
    };
    Loader.prototype.candidates = function (file, dirs, currentFile, enforceRoot) {
        var _a, fs, extname, referenced, dirs_1, dirs_1_1, dir, e_2_1, dirs_2, dirs_2_1, dir, referenced, e_3_1, filepath;
        var e_2, _b, e_3, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = this.options, fs = _a.fs, extname = _a.extname;
                    if (!(this.shouldLoadRelative(file) && currentFile)) return [3 /*break*/, 8];
                    referenced = fs.resolve(this.dirname(currentFile), file, extname);
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 8]);
                    dirs_1 = __values(dirs), dirs_1_1 = dirs_1.next();
                    _d.label = 2;
                case 2:
                    if (!!dirs_1_1.done) return [3 /*break*/, 5];
                    dir = dirs_1_1.value;
                    if (!(!enforceRoot || this.contains(dir, referenced))) return [3 /*break*/, 4];
                    // the relatively referenced file is within one of root dirs
                    return [4 /*yield*/, referenced];
                case 3:
                    // the relatively referenced file is within one of root dirs
                    _d.sent();
                    return [3 /*break*/, 5];
                case 4:
                    dirs_1_1 = dirs_1.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_2_1 = _d.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (dirs_1_1 && !dirs_1_1.done && (_b = dirs_1.return)) _b.call(dirs_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 8:
                    _d.trys.push([8, 13, 14, 15]);
                    dirs_2 = __values(dirs), dirs_2_1 = dirs_2.next();
                    _d.label = 9;
                case 9:
                    if (!!dirs_2_1.done) return [3 /*break*/, 12];
                    dir = dirs_2_1.value;
                    referenced = fs.resolve(dir, file, extname);
                    if (!(!enforceRoot || this.contains(dir, referenced))) return [3 /*break*/, 11];
                    return [4 /*yield*/, referenced];
                case 10:
                    _d.sent();
                    _d.label = 11;
                case 11:
                    dirs_2_1 = dirs_2.next();
                    return [3 /*break*/, 9];
                case 12: return [3 /*break*/, 15];
                case 13:
                    e_3_1 = _d.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 15];
                case 14:
                    try {
                        if (dirs_2_1 && !dirs_2_1.done && (_c = dirs_2.return)) _c.call(dirs_2);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7 /*endfinally*/];
                case 15:
                    if (!(fs.fallback !== undefined)) return [3 /*break*/, 17];
                    filepath = fs.fallback(file);
                    if (!(filepath !== undefined)) return [3 /*break*/, 17];
                    return [4 /*yield*/, filepath];
                case 16:
                    _d.sent();
                    _d.label = 17;
                case 17: return [2 /*return*/];
            }
        });
    };
    Loader.prototype.dirname = function (path) {
        var fs = this.options.fs;
        assert(fs.dirname, '`fs.dirname` is required for relative reference');
        return fs.dirname(path);
    };
    Loader.prototype.lookupError = function (file, roots) {
        var err = new Error('ENOENT');
        err.message = "ENOENT: Failed to lookup \"" + file + "\" in \"" + roots + "\"";
        err.code = 'ENOENT';
        return err;
    };
    return Loader;
}());

var SimpleEmitter = /** @class */ (function () {
    function SimpleEmitter() {
        this.buffer = '';
    }
    SimpleEmitter.prototype.write = function (html) {
        this.buffer += stringify(html);
    };
    return SimpleEmitter;
}());

var StreamedEmitter = /** @class */ (function () {
    function StreamedEmitter() {
        this.buffer = '';
        this.stream = new ((__nccwpck_require__(781).PassThrough))();
    }
    StreamedEmitter.prototype.write = function (html) {
        this.stream.write(stringify(html));
    };
    StreamedEmitter.prototype.error = function (err) {
        this.stream.emit('error', err);
    };
    StreamedEmitter.prototype.end = function () {
        this.stream.end();
    };
    return StreamedEmitter;
}());

function createResolvedThenable(value) {
    var ret = {
        then: function (resolve) { return resolve(value); },
        catch: function () { return ret; }
    };
    return ret;
}
function createRejectedThenable(err) {
    var ret = {
        then: function (resolve, reject) {
            if (reject)
                return reject(err);
            return ret;
        },
        catch: function (reject) { return reject(err); }
    };
    return ret;
}
function isThenable(val) {
    return val && isFunction(val.then);
}
function isAsyncIterator(val) {
    return val && isFunction(val.next) && isFunction(val.throw) && isFunction(val.return);
}
// convert an async iterator to a thenable (Promise compatible)
function toThenable(val) {
    if (isThenable(val))
        return val;
    if (isAsyncIterator(val))
        return reduce();
    return createResolvedThenable(val);
    function reduce(prev) {
        var state;
        try {
            state = val.next(prev);
        }
        catch (err) {
            return createRejectedThenable(err);
        }
        if (state.done)
            return createResolvedThenable(state.value);
        return toThenable(state.value).then(reduce, function (err) {
            var state;
            try {
                state = val.throw(err);
            }
            catch (e) {
                return createRejectedThenable(e);
            }
            if (state.done)
                return createResolvedThenable(state.value);
            return reduce(state.value);
        });
    }
}
function toPromise(val) {
    return Promise.resolve(toThenable(val));
}
// get the value of async iterator in synchronous manner
function toValue$1(val) {
    var ret;
    toThenable(val)
        .then(function (x) {
        ret = x;
        return createResolvedThenable(ret);
    })
        .catch(function (err) {
        throw err;
    });
    return ret;
}

var KeepingTypeEmitter = /** @class */ (function () {
    function KeepingTypeEmitter() {
        this.buffer = '';
    }
    KeepingTypeEmitter.prototype.write = function (html) {
        html = toValue(html);
        // This will only preserve the type if the value is isolated.
        // I.E:
        // {{ my-port }} -> 42
        // {{ my-host }}:{{ my-port }} -> 'host:42'
        if (typeof html !== 'string' && this.buffer === '') {
            this.buffer = html;
        }
        else {
            this.buffer = stringify(this.buffer) + stringify(html);
        }
    };
    return KeepingTypeEmitter;
}());

var Render = /** @class */ (function () {
    function Render() {
    }
    Render.prototype.renderTemplatesToNodeStream = function (templates, ctx) {
        var _this = this;
        var emitter = new StreamedEmitter();
        Promise.resolve().then(function () { return toThenable(_this.renderTemplates(templates, ctx, emitter)); })
            .then(function () { return emitter.end(); }, function (err) { return emitter.error(err); });
        return emitter.stream;
    };
    Render.prototype.renderTemplates = function (templates, ctx, emitter) {
        var templates_1, templates_1_1, tpl, html, e_1, err, e_2_1;
        var e_2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!emitter) {
                        emitter = ctx.opts.keepOutputType ? new KeepingTypeEmitter() : new SimpleEmitter();
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 8, 9, 10]);
                    templates_1 = __values(templates), templates_1_1 = templates_1.next();
                    _b.label = 2;
                case 2:
                    if (!!templates_1_1.done) return [3 /*break*/, 7];
                    tpl = templates_1_1.value;
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, tpl.render(ctx, emitter)
                        // if not, it'll return an `html`, write to the emitter for it
                    ];
                case 4:
                    html = _b.sent();
                    // if not, it'll return an `html`, write to the emitter for it
                    html && emitter.write(html);
                    if (emitter['break'] || emitter['continue'])
                        return [3 /*break*/, 7];
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _b.sent();
                    err = RenderError.is(e_1) ? e_1 : new RenderError(e_1, tpl);
                    throw err;
                case 6:
                    templates_1_1 = templates_1.next();
                    return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 10];
                case 8:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 10];
                case 9:
                    try {
                        if (templates_1_1 && !templates_1_1.done && (_a = templates_1.return)) _a.call(templates_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/, emitter.buffer];
            }
        });
    };
    return Render;
}());

(function (TokenKind) {
    TokenKind[TokenKind["Number"] = 1] = "Number";
    TokenKind[TokenKind["Literal"] = 2] = "Literal";
    TokenKind[TokenKind["Tag"] = 4] = "Tag";
    TokenKind[TokenKind["Output"] = 8] = "Output";
    TokenKind[TokenKind["HTML"] = 16] = "HTML";
    TokenKind[TokenKind["Filter"] = 32] = "Filter";
    TokenKind[TokenKind["Hash"] = 64] = "Hash";
    TokenKind[TokenKind["PropertyAccess"] = 128] = "PropertyAccess";
    TokenKind[TokenKind["Word"] = 256] = "Word";
    TokenKind[TokenKind["Range"] = 512] = "Range";
    TokenKind[TokenKind["Quoted"] = 1024] = "Quoted";
    TokenKind[TokenKind["Operator"] = 2048] = "Operator";
    TokenKind[TokenKind["Delimited"] = 12] = "Delimited";
})(exports.TokenKind || (exports.TokenKind = {}));

function isDelimitedToken(val) {
    return !!(getKind(val) & exports.TokenKind.Delimited);
}
function isOperatorToken(val) {
    return getKind(val) === exports.TokenKind.Operator;
}
function isHTMLToken(val) {
    return getKind(val) === exports.TokenKind.HTML;
}
function isOutputToken(val) {
    return getKind(val) === exports.TokenKind.Output;
}
function isTagToken(val) {
    return getKind(val) === exports.TokenKind.Tag;
}
function isQuotedToken(val) {
    return getKind(val) === exports.TokenKind.Quoted;
}
function isLiteralToken(val) {
    return getKind(val) === exports.TokenKind.Literal;
}
function isNumberToken(val) {
    return getKind(val) === exports.TokenKind.Number;
}
function isPropertyAccessToken(val) {
    return getKind(val) === exports.TokenKind.PropertyAccess;
}
function isWordToken(val) {
    return getKind(val) === exports.TokenKind.Word;
}
function isRangeToken(val) {
    return getKind(val) === exports.TokenKind.Range;
}
function getKind(val) {
    return val ? val.kind : -1;
}

var typeGuards = /*#__PURE__*/Object.freeze({
    isDelimitedToken: isDelimitedToken,
    isOperatorToken: isOperatorToken,
    isHTMLToken: isHTMLToken,
    isOutputToken: isOutputToken,
    isTagToken: isTagToken,
    isQuotedToken: isQuotedToken,
    isLiteralToken: isLiteralToken,
    isNumberToken: isNumberToken,
    isPropertyAccessToken: isPropertyAccessToken,
    isWordToken: isWordToken,
    isRangeToken: isRangeToken
});

var ParseStream = /** @class */ (function () {
    function ParseStream(tokens, parseToken) {
        this.handlers = {};
        this.stopRequested = false;
        this.tokens = tokens;
        this.parseToken = parseToken;
    }
    ParseStream.prototype.on = function (name, cb) {
        this.handlers[name] = cb;
        return this;
    };
    ParseStream.prototype.trigger = function (event, arg) {
        var h = this.handlers[event];
        return h ? (h.call(this, arg), true) : false;
    };
    ParseStream.prototype.start = function () {
        this.trigger('start');
        var token;
        while (!this.stopRequested && (token = this.tokens.shift())) {
            if (this.trigger('token', token))
                continue;
            if (isTagToken(token) && this.trigger("tag:" + token.name, token)) {
                continue;
            }
            var template = this.parseToken(token, this.tokens);
            this.trigger('template', template);
        }
        if (!this.stopRequested)
            this.trigger('end');
        return this;
    };
    ParseStream.prototype.stop = function () {
        this.stopRequested = true;
        return this;
    };
    return ParseStream;
}());

var TemplateImpl = /** @class */ (function () {
    function TemplateImpl(token) {
        this.token = token;
    }
    return TemplateImpl;
}());

var NullDrop = /** @class */ (function (_super) {
    __extends(NullDrop, _super);
    function NullDrop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NullDrop.prototype.equals = function (value) {
        return isNil(toValue(value));
    };
    NullDrop.prototype.gt = function () {
        return false;
    };
    NullDrop.prototype.geq = function () {
        return false;
    };
    NullDrop.prototype.lt = function () {
        return false;
    };
    NullDrop.prototype.leq = function () {
        return false;
    };
    NullDrop.prototype.valueOf = function () {
        return null;
    };
    return NullDrop;
}(Drop));

var EmptyDrop = /** @class */ (function (_super) {
    __extends(EmptyDrop, _super);
    function EmptyDrop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmptyDrop.prototype.equals = function (value) {
        if (value instanceof EmptyDrop)
            return false;
        value = toValue(value);
        if (isString(value) || isArray(value))
            return value.length === 0;
        if (isObject(value))
            return Object.keys(value).length === 0;
        return false;
    };
    EmptyDrop.prototype.gt = function () {
        return false;
    };
    EmptyDrop.prototype.geq = function () {
        return false;
    };
    EmptyDrop.prototype.lt = function () {
        return false;
    };
    EmptyDrop.prototype.leq = function () {
        return false;
    };
    EmptyDrop.prototype.valueOf = function () {
        return '';
    };
    return EmptyDrop;
}(Drop));

var BlankDrop = /** @class */ (function (_super) {
    __extends(BlankDrop, _super);
    function BlankDrop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlankDrop.prototype.equals = function (value) {
        if (value === false)
            return true;
        if (isNil(toValue(value)))
            return true;
        if (isString(value))
            return /^\s*$/.test(value);
        return _super.prototype.equals.call(this, value);
    };
    return BlankDrop;
}(EmptyDrop));

var nil = new NullDrop();
var literalValues = {
    'true': true,
    'false': false,
    'nil': nil,
    'null': nil,
    'empty': new EmptyDrop(),
    'blank': new BlankDrop()
};

var rHex = /[\da-fA-F]/;
var rOct = /[0-7]/;
var escapeChar = {
    b: '\b',
    f: '\f',
    n: '\n',
    r: '\r',
    t: '\t',
    v: '\x0B'
};
function hexVal(c) {
    var code = c.charCodeAt(0);
    if (code >= 97)
        return code - 87;
    if (code >= 65)
        return code - 55;
    return code - 48;
}
function parseStringLiteral(str) {
    var ret = '';
    for (var i = 1; i < str.length - 1; i++) {
        if (str[i] !== '\\') {
            ret += str[i];
            continue;
        }
        if (escapeChar[str[i + 1]] !== undefined) {
            ret += escapeChar[str[++i]];
        }
        else if (str[i + 1] === 'u') {
            var val = 0;
            var j = i + 2;
            while (j <= i + 5 && rHex.test(str[j])) {
                val = val * 16 + hexVal(str[j++]);
            }
            i = j - 1;
            ret += String.fromCharCode(val);
        }
        else if (!rOct.test(str[i + 1])) {
            ret += str[++i];
        }
        else {
            var j = i + 1;
            var val = 0;
            while (j <= i + 3 && rOct.test(str[j])) {
                val = val * 8 + hexVal(str[j++]);
            }
            i = j - 1;
            ret += String.fromCharCode(val);
        }
    }
    return ret;
}

var Expression = /** @class */ (function () {
    function Expression(tokens) {
        this.postfix = __spread(toPostfix(tokens));
    }
    Expression.prototype.evaluate = function (ctx, lenient) {
        var operands, _a, _b, token, r, l, result, _c, _d, e_1_1;
        var e_1, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    assert(ctx, 'unable to evaluate: context not defined');
                    operands = [];
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 9, 10, 11]);
                    _a = __values(this.postfix), _b = _a.next();
                    _f.label = 2;
                case 2:
                    if (!!_b.done) return [3 /*break*/, 8];
                    token = _b.value;
                    if (!isOperatorToken(token)) return [3 /*break*/, 5];
                    return [4 /*yield*/, operands.pop()];
                case 3:
                    r = _f.sent();
                    return [4 /*yield*/, operands.pop()];
                case 4:
                    l = _f.sent();
                    result = evalOperatorToken(ctx.opts.operators, token, l, r, ctx);
                    operands.push(result);
                    return [3 /*break*/, 7];
                case 5:
                    _d = (_c = operands).push;
                    return [4 /*yield*/, evalToken(token, ctx, lenient && this.postfix.length === 1)];
                case 6:
                    _d.apply(_c, [_f.sent()]);
                    _f.label = 7;
                case 7:
                    _b = _a.next();
                    return [3 /*break*/, 2];
                case 8: return [3 /*break*/, 11];
                case 9:
                    e_1_1 = _f.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 11];
                case 10:
                    try {
                        if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/, operands[0]];
            }
        });
    };
    return Expression;
}());
function evalToken(token, ctx, lenient) {
    if (lenient === void 0) { lenient = false; }
    if (isPropertyAccessToken(token))
        return evalPropertyAccessToken(token, ctx, lenient);
    if (isRangeToken(token))
        return evalRangeToken(token, ctx);
    if (isLiteralToken(token))
        return evalLiteralToken(token);
    if (isNumberToken(token))
        return evalNumberToken(token);
    if (isWordToken(token))
        return token.getText();
    if (isQuotedToken(token))
        return evalQuotedToken(token);
}
function evalPropertyAccessToken(token, ctx, lenient) {
    var props = token.props.map(function (prop) { return evalToken(prop, ctx, false); });
    try {
        return ctx.get(__spread([token.propertyName], props));
    }
    catch (e) {
        if (lenient && e.name === 'InternalUndefinedVariableError')
            return null;
        throw (new UndefinedVariableError(e, token));
    }
}
function evalNumberToken(token) {
    var str = token.whole.content + '.' + (token.decimal ? token.decimal.content : '');
    return Number(str);
}
function evalQuotedToken(token) {
    return parseStringLiteral(token.getText());
}
function evalOperatorToken(operators, token, lhs, rhs, ctx) {
    var impl = operators[token.operator];
    return impl(lhs, rhs, ctx);
}
function evalLiteralToken(token) {
    return literalValues[token.literal];
}
function evalRangeToken(token, ctx) {
    var low = evalToken(token.lhs, ctx);
    var high = evalToken(token.rhs, ctx);
    return range(+low, +high + 1);
}
function toPostfix(tokens) {
    var ops, tokens_1, tokens_1_1, token, e_2_1;
    var e_2, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ops = [];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 10, 11, 12]);
                tokens_1 = __values(tokens), tokens_1_1 = tokens_1.next();
                _b.label = 2;
            case 2:
                if (!!tokens_1_1.done) return [3 /*break*/, 9];
                token = tokens_1_1.value;
                if (!isOperatorToken(token)) return [3 /*break*/, 6];
                _b.label = 3;
            case 3:
                if (!(ops.length && ops[ops.length - 1].getPrecedence() > token.getPrecedence())) return [3 /*break*/, 5];
                return [4 /*yield*/, ops.pop()];
            case 4:
                _b.sent();
                return [3 /*break*/, 3];
            case 5:
                ops.push(token);
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, token];
            case 7:
                _b.sent();
                _b.label = 8;
            case 8:
                tokens_1_1 = tokens_1.next();
                return [3 /*break*/, 2];
            case 9: return [3 /*break*/, 12];
            case 10:
                e_2_1 = _b.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 12];
            case 11:
                try {
                    if (tokens_1_1 && !tokens_1_1.done && (_a = tokens_1.return)) _a.call(tokens_1);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 12:
                if (!ops.length) return [3 /*break*/, 14];
                return [4 /*yield*/, ops.pop()];
            case 13:
                _b.sent();
                return [3 /*break*/, 12];
            case 14: return [2 /*return*/];
        }
    });
}

var Token = /** @class */ (function () {
    function Token(kind, input, begin, end, file) {
        this.kind = kind;
        this.input = input;
        this.begin = begin;
        this.end = end;
        this.file = file;
    }
    Token.prototype.getText = function () {
        return this.input.slice(this.begin, this.end);
    };
    Token.prototype.getPosition = function () {
        var _a = __read([1, 1], 2), row = _a[0], col = _a[1];
        for (var i = 0; i < this.begin; i++) {
            if (this.input[i] === '\n') {
                row++;
                col = 1;
            }
            else
                col++;
        }
        return [row, col];
    };
    Token.prototype.size = function () {
        return this.end - this.begin;
    };
    return Token;
}());

var DelimitedToken = /** @class */ (function (_super) {
    __extends(DelimitedToken, _super);
    function DelimitedToken(kind, content, input, begin, end, trimLeft, trimRight, file) {
        var _this = _super.call(this, kind, input, begin, end, file) || this;
        _this.trimLeft = false;
        _this.trimRight = false;
        _this.content = _this.getText();
        var tl = content[0] === '-';
        var tr = last(content) === '-';
        _this.content = content
            .slice(tl ? 1 : 0, tr ? -1 : content.length)
            .trim();
        _this.trimLeft = tl || trimLeft;
        _this.trimRight = tr || trimRight;
        return _this;
    }
    return DelimitedToken;
}(Token));

function whiteSpaceCtrl(tokens, options) {
    var inRaw = false;
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        if (!isDelimitedToken(token))
            continue;
        if (!inRaw && token.trimLeft) {
            trimLeft(tokens[i - 1], options.greedy);
        }
        if (isTagToken(token)) {
            if (token.name === 'raw')
                inRaw = true;
            else if (token.name === 'endraw')
                inRaw = false;
        }
        if (!inRaw && token.trimRight) {
            trimRight(tokens[i + 1], options.greedy);
        }
    }
}
function trimLeft(token, greedy) {
    if (!token || !isHTMLToken(token))
        return;
    var mask = greedy ? BLANK : INLINE_BLANK;
    while (TYPES[token.input.charCodeAt(token.end - 1 - token.trimRight)] & mask)
        token.trimRight++;
}
function trimRight(token, greedy) {
    if (!token || !isHTMLToken(token))
        return;
    var mask = greedy ? BLANK : INLINE_BLANK;
    while (TYPES[token.input.charCodeAt(token.begin + token.trimLeft)] & mask)
        token.trimLeft++;
    if (token.input.charAt(token.begin + token.trimLeft) === '\n')
        token.trimLeft++;
}

var NumberToken = /** @class */ (function (_super) {
    __extends(NumberToken, _super);
    function NumberToken(whole, decimal) {
        var _this = _super.call(this, exports.TokenKind.Number, whole.input, whole.begin, decimal ? decimal.end : whole.end, whole.file) || this;
        _this.whole = whole;
        _this.decimal = decimal;
        return _this;
    }
    return NumberToken;
}(Token));

var IdentifierToken = /** @class */ (function (_super) {
    __extends(IdentifierToken, _super);
    function IdentifierToken(input, begin, end, file) {
        var _this = _super.call(this, exports.TokenKind.Word, input, begin, end, file) || this;
        _this.input = input;
        _this.begin = begin;
        _this.end = end;
        _this.file = file;
        _this.content = _this.getText();
        return _this;
    }
    IdentifierToken.prototype.isNumber = function (allowSign) {
        if (allowSign === void 0) { allowSign = false; }
        var begin = allowSign && TYPES[this.input.charCodeAt(this.begin)] & SIGN
            ? this.begin + 1
            : this.begin;
        for (var i = begin; i < this.end; i++) {
            if (!(TYPES[this.input.charCodeAt(i)] & NUMBER))
                return false;
        }
        return true;
    };
    return IdentifierToken;
}(Token));

var LiteralToken = /** @class */ (function (_super) {
    __extends(LiteralToken, _super);
    function LiteralToken(input, begin, end, file) {
        var _this = _super.call(this, exports.TokenKind.Literal, input, begin, end, file) || this;
        _this.input = input;
        _this.begin = begin;
        _this.end = end;
        _this.file = file;
        _this.literal = _this.getText();
        return _this;
    }
    return LiteralToken;
}(Token));

var precedence = {
    '==': 1,
    '!=': 1,
    '>': 1,
    '<': 1,
    '>=': 1,
    '<=': 1,
    'contains': 1,
    'and': 0,
    'or': 0
};
var OperatorToken = /** @class */ (function (_super) {
    __extends(OperatorToken, _super);
    function OperatorToken(input, begin, end, file) {
        var _this = _super.call(this, exports.TokenKind.Operator, input, begin, end, file) || this;
        _this.input = input;
        _this.begin = begin;
        _this.end = end;
        _this.file = file;
        _this.operator = _this.getText();
        return _this;
    }
    OperatorToken.prototype.getPrecedence = function () {
        var key = this.getText();
        return key in precedence ? precedence[key] : 1;
    };
    return OperatorToken;
}(Token));

var PropertyAccessToken = /** @class */ (function (_super) {
    __extends(PropertyAccessToken, _super);
    function PropertyAccessToken(variable, props, end) {
        var _this = _super.call(this, exports.TokenKind.PropertyAccess, variable.input, variable.begin, end, variable.file) || this;
        _this.variable = variable;
        _this.props = props;
        _this.propertyName = _this.variable instanceof IdentifierToken
            ? _this.variable.getText()
            : parseStringLiteral(_this.variable.getText());
        return _this;
    }
    return PropertyAccessToken;
}(Token));

var FilterToken = /** @class */ (function (_super) {
    __extends(FilterToken, _super);
    function FilterToken(name, args, input, begin, end, file) {
        var _this = _super.call(this, exports.TokenKind.Filter, input, begin, end, file) || this;
        _this.name = name;
        _this.args = args;
        return _this;
    }
    return FilterToken;
}(Token));

var HashToken = /** @class */ (function (_super) {
    __extends(HashToken, _super);
    function HashToken(input, begin, end, name, value, file) {
        var _this = _super.call(this, exports.TokenKind.Hash, input, begin, end, file) || this;
        _this.input = input;
        _this.begin = begin;
        _this.end = end;
        _this.name = name;
        _this.value = value;
        _this.file = file;
        return _this;
    }
    return HashToken;
}(Token));

var QuotedToken = /** @class */ (function (_super) {
    __extends(QuotedToken, _super);
    function QuotedToken(input, begin, end, file) {
        var _this = _super.call(this, exports.TokenKind.Quoted, input, begin, end, file) || this;
        _this.input = input;
        _this.begin = begin;
        _this.end = end;
        _this.file = file;
        return _this;
    }
    return QuotedToken;
}(Token));

var HTMLToken = /** @class */ (function (_super) {
    __extends(HTMLToken, _super);
    function HTMLToken(input, begin, end, file) {
        var _this = _super.call(this, exports.TokenKind.HTML, input, begin, end, file) || this;
        _this.input = input;
        _this.begin = begin;
        _this.end = end;
        _this.file = file;
        _this.trimLeft = 0;
        _this.trimRight = 0;
        return _this;
    }
    HTMLToken.prototype.getContent = function () {
        return this.input.slice(this.begin + this.trimLeft, this.end - this.trimRight);
    };
    return HTMLToken;
}(Token));

var RangeToken = /** @class */ (function (_super) {
    __extends(RangeToken, _super);
    function RangeToken(input, begin, end, lhs, rhs, file) {
        var _this = _super.call(this, exports.TokenKind.Range, input, begin, end, file) || this;
        _this.input = input;
        _this.begin = begin;
        _this.end = end;
        _this.lhs = lhs;
        _this.rhs = rhs;
        _this.file = file;
        return _this;
    }
    return RangeToken;
}(Token));

var OutputToken = /** @class */ (function (_super) {
    __extends(OutputToken, _super);
    function OutputToken(input, begin, end, options, file) {
        var _this = this;
        var trimOutputLeft = options.trimOutputLeft, trimOutputRight = options.trimOutputRight, outputDelimiterLeft = options.outputDelimiterLeft, outputDelimiterRight = options.outputDelimiterRight;
        var value = input.slice(begin + outputDelimiterLeft.length, end - outputDelimiterRight.length);
        _this = _super.call(this, exports.TokenKind.Output, value, input, begin, end, trimOutputLeft, trimOutputRight, file) || this;
        return _this;
    }
    return OutputToken;
}(DelimitedToken));

function matchOperator(str, begin, trie, end) {
    if (end === void 0) { end = str.length; }
    var node = trie;
    var i = begin;
    var info;
    while (node[str[i]] && i < end) {
        node = node[str[i++]];
        if (node['end'])
            info = node;
    }
    if (!info)
        return -1;
    if (info['needBoundary'] && (TYPES[str.charCodeAt(i)] & IDENTIFIER))
        return -1;
    return i;
}

var Tokenizer = /** @class */ (function () {
    function Tokenizer(input, trie, file) {
        if (file === void 0) { file = ''; }
        this.input = input;
        this.trie = trie;
        this.file = file;
        this.p = 0;
        this.rawBeginAt = -1;
        this.N = input.length;
    }
    Tokenizer.prototype.readExpression = function () {
        return new Expression(this.readExpressionTokens());
    };
    Tokenizer.prototype.readExpressionTokens = function () {
        var operand, operator, operand_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    operand = this.readValue();
                    if (!operand)
                        return [2 /*return*/];
                    return [4 /*yield*/, operand];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(this.p < this.N)) return [3 /*break*/, 5];
                    operator = this.readOperator();
                    if (!operator)
                        return [2 /*return*/];
                    operand_1 = this.readValue();
                    if (!operand_1)
                        return [2 /*return*/];
                    return [4 /*yield*/, operator];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, operand_1];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    };
    Tokenizer.prototype.readOperator = function () {
        this.skipBlank();
        var end = matchOperator(this.input, this.p, this.trie, this.p + 8);
        if (end === -1)
            return;
        return new OperatorToken(this.input, this.p, (this.p = end), this.file);
    };
    Tokenizer.prototype.readFilters = function () {
        var filters = [];
        while (true) {
            var filter = this.readFilter();
            if (!filter)
                return filters;
            filters.push(filter);
        }
    };
    Tokenizer.prototype.readFilter = function () {
        var _this = this;
        this.skipBlank();
        if (this.end())
            return null;
        assert(this.peek() === '|', function () { return "unexpected token at " + _this.snapshot(); });
        this.p++;
        var begin = this.p;
        var name = this.readIdentifier();
        if (!name.size())
            return null;
        var args = [];
        this.skipBlank();
        if (this.peek() === ':') {
            do {
                ++this.p;
                var arg = this.readFilterArg();
                arg && args.push(arg);
                while (this.p < this.N && this.peek() !== ',' && this.peek() !== '|')
                    ++this.p;
            } while (this.peek() === ',');
        }
        return new FilterToken(name.getText(), args, this.input, begin, this.p, this.file);
    };
    Tokenizer.prototype.readFilterArg = function () {
        var key = this.readValue();
        if (!key)
            return;
        this.skipBlank();
        if (this.peek() !== ':')
            return key;
        ++this.p;
        var value = this.readValue();
        return [key.getText(), value];
    };
    Tokenizer.prototype.readTopLevelTokens = function (options) {
        if (options === void 0) { options = defaultOptions; }
        var tokens = [];
        while (this.p < this.N) {
            var token = this.readTopLevelToken(options);
            tokens.push(token);
        }
        whiteSpaceCtrl(tokens, options);
        return tokens;
    };
    Tokenizer.prototype.readTopLevelToken = function (options) {
        var tagDelimiterLeft = options.tagDelimiterLeft, outputDelimiterLeft = options.outputDelimiterLeft;
        if (this.rawBeginAt > -1)
            return this.readEndrawOrRawContent(options);
        if (this.match(tagDelimiterLeft))
            return this.readTagToken(options);
        if (this.match(outputDelimiterLeft))
            return this.readOutputToken(options);
        return this.readHTMLToken(options);
    };
    Tokenizer.prototype.readHTMLToken = function (options) {
        var begin = this.p;
        while (this.p < this.N) {
            var tagDelimiterLeft = options.tagDelimiterLeft, outputDelimiterLeft = options.outputDelimiterLeft;
            if (this.match(tagDelimiterLeft))
                break;
            if (this.match(outputDelimiterLeft))
                break;
            ++this.p;
        }
        return new HTMLToken(this.input, begin, this.p, this.file);
    };
    Tokenizer.prototype.readTagToken = function (options) {
        if (options === void 0) { options = defaultOptions; }
        var _a = this, file = _a.file, input = _a.input;
        var begin = this.p;
        if (this.readToDelimiter(options.tagDelimiterRight) === -1) {
            throw this.mkError("tag " + this.snapshot(begin) + " not closed", begin);
        }
        var token = new TagToken(input, begin, this.p, options, file);
        if (token.name === 'raw')
            this.rawBeginAt = begin;
        return token;
    };
    Tokenizer.prototype.readToDelimiter = function (delimiter) {
        while (this.p < this.N) {
            if ((this.peekType() & QUOTE)) {
                this.readQuoted();
                continue;
            }
            ++this.p;
            if (this.rmatch(delimiter))
                return this.p;
        }
        return -1;
    };
    Tokenizer.prototype.readOutputToken = function (options) {
        if (options === void 0) { options = defaultOptions; }
        var _a = this, file = _a.file, input = _a.input;
        var outputDelimiterRight = options.outputDelimiterRight;
        var begin = this.p;
        if (this.readToDelimiter(outputDelimiterRight) === -1) {
            throw this.mkError("output " + this.snapshot(begin) + " not closed", begin);
        }
        return new OutputToken(input, begin, this.p, options, file);
    };
    Tokenizer.prototype.readEndrawOrRawContent = function (options) {
        var tagDelimiterLeft = options.tagDelimiterLeft, tagDelimiterRight = options.tagDelimiterRight;
        var begin = this.p;
        var leftPos = this.readTo(tagDelimiterLeft) - tagDelimiterLeft.length;
        while (this.p < this.N) {
            if (this.readIdentifier().getText() !== 'endraw') {
                leftPos = this.readTo(tagDelimiterLeft) - tagDelimiterLeft.length;
                continue;
            }
            while (this.p <= this.N) {
                if (this.rmatch(tagDelimiterRight)) {
                    var end = this.p;
                    if (begin === leftPos) {
                        this.rawBeginAt = -1;
                        return new TagToken(this.input, begin, end, options, this.file);
                    }
                    else {
                        this.p = leftPos;
                        return new HTMLToken(this.input, begin, leftPos, this.file);
                    }
                }
                if (this.rmatch(tagDelimiterLeft))
                    break;
                this.p++;
            }
        }
        throw this.mkError("raw " + this.snapshot(this.rawBeginAt) + " not closed", begin);
    };
    Tokenizer.prototype.mkError = function (msg, begin) {
        return new TokenizationError(msg, new IdentifierToken(this.input, begin, this.N, this.file));
    };
    Tokenizer.prototype.snapshot = function (begin) {
        if (begin === void 0) { begin = this.p; }
        return JSON.stringify(ellipsis(this.input.slice(begin), 16));
    };
    /**
     * @deprecated
     */
    Tokenizer.prototype.readWord = function () {
        console.warn('Tokenizer#readWord() will be removed, use #readIdentifier instead');
        return this.readIdentifier();
    };
    Tokenizer.prototype.readIdentifier = function () {
        this.skipBlank();
        var begin = this.p;
        while (this.peekType() & IDENTIFIER)
            ++this.p;
        return new IdentifierToken(this.input, begin, this.p, this.file);
    };
    Tokenizer.prototype.readHashes = function () {
        var hashes = [];
        while (true) {
            var hash = this.readHash();
            if (!hash)
                return hashes;
            hashes.push(hash);
        }
    };
    Tokenizer.prototype.readHash = function () {
        this.skipBlank();
        if (this.peek() === ',')
            ++this.p;
        var begin = this.p;
        var name = this.readIdentifier();
        if (!name.size())
            return;
        var value;
        this.skipBlank();
        if (this.peek() === ':') {
            ++this.p;
            value = this.readValue();
        }
        return new HashToken(this.input, begin, this.p, name, value, this.file);
    };
    Tokenizer.prototype.remaining = function () {
        return this.input.slice(this.p);
    };
    Tokenizer.prototype.advance = function (i) {
        if (i === void 0) { i = 1; }
        this.p += i;
    };
    Tokenizer.prototype.end = function () {
        return this.p >= this.N;
    };
    Tokenizer.prototype.readTo = function (end) {
        while (this.p < this.N) {
            ++this.p;
            if (this.rmatch(end))
                return this.p;
        }
        return -1;
    };
    Tokenizer.prototype.readValue = function () {
        var value = this.readQuoted() || this.readRange();
        if (value)
            return value;
        if (this.peek() === '[') {
            this.p++;
            var prop = this.readQuoted();
            if (!prop)
                return;
            if (this.peek() !== ']')
                return;
            this.p++;
            return new PropertyAccessToken(prop, [], this.p);
        }
        var variable = this.readIdentifier();
        if (!variable.size())
            return;
        var isNumber = variable.isNumber(true);
        var props = [];
        while (true) {
            if (this.peek() === '[') {
                isNumber = false;
                this.p++;
                var prop = this.readValue() || new IdentifierToken(this.input, this.p, this.p, this.file);
                this.readTo(']');
                props.push(prop);
            }
            else if (this.peek() === '.' && this.peek(1) !== '.') { // skip range syntax
                this.p++;
                var prop = this.readIdentifier();
                if (!prop.size())
                    break;
                if (!prop.isNumber())
                    isNumber = false;
                props.push(prop);
            }
            else
                break;
        }
        if (!props.length && literalValues.hasOwnProperty(variable.content)) {
            return new LiteralToken(this.input, variable.begin, variable.end, this.file);
        }
        if (isNumber)
            return new NumberToken(variable, props[0]);
        return new PropertyAccessToken(variable, props, this.p);
    };
    Tokenizer.prototype.readRange = function () {
        this.skipBlank();
        var begin = this.p;
        if (this.peek() !== '(')
            return;
        ++this.p;
        var lhs = this.readValueOrThrow();
        this.p += 2;
        var rhs = this.readValueOrThrow();
        ++this.p;
        return new RangeToken(this.input, begin, this.p, lhs, rhs, this.file);
    };
    Tokenizer.prototype.readValueOrThrow = function () {
        var _this = this;
        var value = this.readValue();
        assert(value, function () { return "unexpected token " + _this.snapshot() + ", value expected"; });
        return value;
    };
    Tokenizer.prototype.readQuoted = function () {
        this.skipBlank();
        var begin = this.p;
        if (!(this.peekType() & QUOTE))
            return;
        ++this.p;
        var escaped = false;
        while (this.p < this.N) {
            ++this.p;
            if (this.input[this.p - 1] === this.input[begin] && !escaped)
                break;
            if (escaped)
                escaped = false;
            else if (this.input[this.p - 1] === '\\')
                escaped = true;
        }
        return new QuotedToken(this.input, begin, this.p, this.file);
    };
    Tokenizer.prototype.readFileName = function () {
        var begin = this.p;
        while (!(this.peekType() & BLANK) && this.peek() !== ',' && this.p < this.N)
            this.p++;
        return new IdentifierToken(this.input, begin, this.p, this.file);
    };
    Tokenizer.prototype.match = function (word) {
        for (var i = 0; i < word.length; i++) {
            if (word[i] !== this.input[this.p + i])
                return false;
        }
        return true;
    };
    Tokenizer.prototype.rmatch = function (pattern) {
        for (var i = 0; i < pattern.length; i++) {
            if (pattern[pattern.length - 1 - i] !== this.input[this.p - 1 - i])
                return false;
        }
        return true;
    };
    Tokenizer.prototype.peekType = function (n) {
        if (n === void 0) { n = 0; }
        return TYPES[this.input.charCodeAt(this.p + n)];
    };
    Tokenizer.prototype.peek = function (n) {
        if (n === void 0) { n = 0; }
        return this.input[this.p + n];
    };
    Tokenizer.prototype.skipBlank = function () {
        while (this.peekType() & BLANK)
            ++this.p;
    };
    return Tokenizer;
}());

var TagToken = /** @class */ (function (_super) {
    __extends(TagToken, _super);
    function TagToken(input, begin, end, options, file) {
        var _this = this;
        var trimTagLeft = options.trimTagLeft, trimTagRight = options.trimTagRight, tagDelimiterLeft = options.tagDelimiterLeft, tagDelimiterRight = options.tagDelimiterRight;
        var value = input.slice(begin + tagDelimiterLeft.length, end - tagDelimiterRight.length);
        _this = _super.call(this, exports.TokenKind.Tag, value, input, begin, end, trimTagLeft, trimTagRight, file) || this;
        var tokenizer = new Tokenizer(_this.content, options.operatorsTrie);
        _this.name = tokenizer.readIdentifier().getText();
        if (!_this.name)
            throw new TokenizationError("illegal tag syntax", _this);
        tokenizer.skipBlank();
        _this.args = tokenizer.remaining();
        return _this;
    }
    return TagToken;
}(DelimitedToken));

/**
 * Key-Value Pairs Representing Tag Arguments
 * Example:
 *    For the markup `, foo:'bar', coo:2 reversed %}`,
 *    hash['foo'] === 'bar'
 *    hash['coo'] === 2
 *    hash['reversed'] === undefined
 */
var Hash = /** @class */ (function () {
    function Hash(markup) {
        var e_1, _a;
        this.hash = {};
        var tokenizer = new Tokenizer(markup, {});
        try {
            for (var _b = __values(tokenizer.readHashes()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var hash = _c.value;
                this.hash[hash.name.content] = hash.value;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    Hash.prototype.render = function (ctx) {
        var hash, _a, _b, key, _c, _d, _e, e_2_1;
        var e_2, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    hash = {};
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 8, 9, 10]);
                    _a = __values(Object.keys(this.hash)), _b = _a.next();
                    _g.label = 2;
                case 2:
                    if (!!_b.done) return [3 /*break*/, 7];
                    key = _b.value;
                    _c = hash;
                    _d = key;
                    if (!(this.hash[key] === undefined)) return [3 /*break*/, 3];
                    _e = true;
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, evalToken(this.hash[key], ctx)];
                case 4:
                    _e = _g.sent();
                    _g.label = 5;
                case 5:
                    _c[_d] = _e;
                    _g.label = 6;
                case 6:
                    _b = _a.next();
                    return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 10];
                case 8:
                    e_2_1 = _g.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 10];
                case 9:
                    try {
                        if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/, hash];
            }
        });
    };
    return Hash;
}());

function isKeyValuePair(arr) {
    return isArray(arr);
}

var Filter = /** @class */ (function () {
    function Filter(name, impl, args, liquid) {
        this.name = name;
        this.impl = impl || identify;
        this.args = args;
        this.liquid = liquid;
    }
    Filter.prototype.render = function (value, context) {
        var e_1, _a;
        var argv = [];
        try {
            for (var _b = __values(this.args), _c = _b.next(); !_c.done; _c = _b.next()) {
                var arg = _c.value;
                if (isKeyValuePair(arg))
                    argv.push([arg[0], evalToken(arg[1], context)]);
                else
                    argv.push(evalToken(arg, context));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this.impl.apply({ context: context, liquid: this.liquid }, __spread([value], argv));
    };
    return Filter;
}());

var Value = /** @class */ (function () {
    /**
     * @param str the value to be valuated, eg.: "foobar" | truncate: 3
     */
    function Value(str, liquid) {
        this.filters = [];
        var tokenizer = new Tokenizer(str, liquid.options.operatorsTrie);
        this.initial = tokenizer.readExpression();
        this.filters = tokenizer.readFilters().map(function (_a) {
            var name = _a.name, args = _a.args;
            return new Filter(name, liquid.filters.get(name), args, liquid);
        });
    }
    Value.prototype.value = function (ctx, lenient) {
        var val, _a, _b, filter, e_1_1;
        var e_1, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    lenient = lenient || (ctx.opts.lenientIf && this.filters.length > 0 && this.filters[0].name === 'default');
                    return [4 /*yield*/, this.initial.evaluate(ctx, lenient)];
                case 1:
                    val = _d.sent();
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 7, 8, 9]);
                    _a = __values(this.filters), _b = _a.next();
                    _d.label = 3;
                case 3:
                    if (!!_b.done) return [3 /*break*/, 6];
                    filter = _b.value;
                    return [4 /*yield*/, filter.render(val, ctx)];
                case 4:
                    val = _d.sent();
                    _d.label = 5;
                case 5:
                    _b = _a.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/, val];
            }
        });
    };
    return Value;
}());

var Tag = /** @class */ (function (_super) {
    __extends(Tag, _super);
    function Tag(token, tokens, liquid) {
        var _this = _super.call(this, token) || this;
        _this.name = token.name;
        var impl = liquid.tags.get(token.name);
        _this.impl = Object.create(impl);
        _this.impl.liquid = liquid;
        if (_this.impl.parse) {
            _this.impl.parse(token, tokens);
        }
        return _this;
    }
    Tag.prototype.render = function (ctx, emitter) {
        var hash, impl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Hash(this.token.args).render(ctx)];
                case 1:
                    hash = _a.sent();
                    impl = this.impl;
                    if (!isFunction(impl.render)) return [3 /*break*/, 3];
                    return [4 /*yield*/, impl.render(ctx, emitter, hash)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [2 /*return*/];
            }
        });
    };
    return Tag;
}(TemplateImpl));

var Output = /** @class */ (function (_super) {
    __extends(Output, _super);
    function Output(token, liquid) {
        var _this = _super.call(this, token) || this;
        _this.value = new Value(token.content, liquid);
        return _this;
    }
    Output.prototype.render = function (ctx, emitter) {
        var val;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.value.value(ctx, false)];
                case 1:
                    val = _a.sent();
                    emitter.write(val);
                    return [2 /*return*/];
            }
        });
    };
    return Output;
}(TemplateImpl));

var HTML = /** @class */ (function (_super) {
    __extends(HTML, _super);
    function HTML(token) {
        var _this = _super.call(this, token) || this;
        _this.str = token.getContent();
        return _this;
    }
    HTML.prototype.render = function (ctx, emitter) {
        return __generator(this, function (_a) {
            emitter.write(this.str);
            return [2 /*return*/];
        });
    };
    return HTML;
}(TemplateImpl));

var Parser = /** @class */ (function () {
    function Parser(liquid) {
        this.liquid = liquid;
        this.cache = this.liquid.options.cache;
        this.fs = this.liquid.options.fs;
        this.parseFile = this.cache ? this._parseFileCached : this._parseFile;
        this.loader = new Loader(this.liquid.options);
    }
    Parser.prototype.parse = function (html, filepath) {
        var tokenizer = new Tokenizer(html, this.liquid.options.operatorsTrie, filepath);
        var tokens = tokenizer.readTopLevelTokens(this.liquid.options);
        return this.parseTokens(tokens);
    };
    Parser.prototype.parseTokens = function (tokens) {
        var token;
        var templates = [];
        while ((token = tokens.shift())) {
            templates.push(this.parseToken(token, tokens));
        }
        return templates;
    };
    Parser.prototype.parseToken = function (token, remainTokens) {
        try {
            if (isTagToken(token)) {
                return new Tag(token, remainTokens, this.liquid);
            }
            if (isOutputToken(token)) {
                return new Output(token, this.liquid);
            }
            return new HTML(token);
        }
        catch (e) {
            throw new ParseError(e, token);
        }
    };
    Parser.prototype.parseStream = function (tokens) {
        var _this = this;
        return new ParseStream(tokens, function (token, tokens) { return _this.parseToken(token, tokens); });
    };
    Parser.prototype._parseFileCached = function (file, sync, type, currentFile) {
        var key, tpls, task, e_1;
        if (type === void 0) { type = LookupType.Root; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    key = this.loader.shouldLoadRelative(file)
                        ? currentFile + ',' + file
                        : type + ':' + file;
                    return [4 /*yield*/, this.cache.read(key)];
                case 1:
                    tpls = _a.sent();
                    if (tpls)
                        return [2 /*return*/, tpls];
                    task = toThenable(this._parseFile(file, sync, type, currentFile));
                    this.cache.write(key, task);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, task];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    e_1 = _a.sent();
                    // remove cached task if failed
                    this.cache.remove(key);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    };
    Parser.prototype._parseFile = function (file, sync, type, currentFile) {
        var filepath, _a, _b, _c;
        if (type === void 0) { type = LookupType.Root; }
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, this.loader.lookup(file, type, sync, currentFile)];
                case 1:
                    filepath = _d.sent();
                    _b = (_a = this.liquid).parse;
                    if (!sync) return [3 /*break*/, 2];
                    _c = this.fs.readFileSync(filepath);
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, this.fs.readFile(filepath)];
                case 3:
                    _c = _d.sent();
                    _d.label = 4;
                case 4: return [2 /*return*/, _b.apply(_a, [_c, filepath])];
            }
        });
    };
    return Parser;
}());

var assign = {
    parse: function (token) {
        var tokenizer = new Tokenizer(token.args, this.liquid.options.operatorsTrie);
        this.key = tokenizer.readIdentifier().content;
        tokenizer.skipBlank();
        assert(tokenizer.peek() === '=', function () { return "illegal token " + token.getText(); });
        tokenizer.advance();
        this.value = tokenizer.remaining();
    },
    render: function (ctx) {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = ctx.bottom();
                    _b = this.key;
                    return [4 /*yield*/, this.liquid._evalValue(this.value, ctx)];
                case 1:
                    _a[_b] = _c.sent();
                    return [2 /*return*/];
            }
        });
    }
};

function toEnumerable(val) {
    if (isArray(val))
        return val;
    if (isString(val) && val.length > 0)
        return [val];
    if (isObject(val))
        return Object.keys(val).map(function (key) { return [key, val[key]]; });
    return [];
}
function toArray(val) {
    if (isArray(val))
        return val;
    return [val];
}

var ForloopDrop = /** @class */ (function (_super) {
    __extends(ForloopDrop, _super);
    function ForloopDrop(length, collection, variable) {
        var _this = _super.call(this) || this;
        _this.i = 0;
        _this.length = length;
        _this.name = variable + "-" + collection;
        return _this;
    }
    ForloopDrop.prototype.next = function () {
        this.i++;
    };
    ForloopDrop.prototype.index0 = function () {
        return this.i;
    };
    ForloopDrop.prototype.index = function () {
        return this.i + 1;
    };
    ForloopDrop.prototype.first = function () {
        return this.i === 0;
    };
    ForloopDrop.prototype.last = function () {
        return this.i === this.length - 1;
    };
    ForloopDrop.prototype.rindex = function () {
        return this.length - this.i;
    };
    ForloopDrop.prototype.rindex0 = function () {
        return this.length - this.i - 1;
    };
    ForloopDrop.prototype.valueOf = function () {
        return JSON.stringify(this);
    };
    return ForloopDrop;
}(Drop));

var MODIFIERS = ['offset', 'limit', 'reversed'];
var For = {
    type: 'block',
    parse: function (token, remainTokens) {
        var _this = this;
        var tokenizer = new Tokenizer(token.args, this.liquid.options.operatorsTrie);
        var variable = tokenizer.readIdentifier();
        var inStr = tokenizer.readIdentifier();
        var collection = tokenizer.readValue();
        assert(variable.size() && inStr.content === 'in' && collection, function () { return "illegal tag: " + token.getText(); });
        this.variable = variable.content;
        this.collection = collection;
        this.hash = new Hash(tokenizer.remaining());
        this.templates = [];
        this.elseTemplates = [];
        var p;
        var stream = this.liquid.parser.parseStream(remainTokens)
            .on('start', function () { return (p = _this.templates); })
            .on('tag:else', function () { return (p = _this.elseTemplates); })
            .on('tag:endfor', function () { return stream.stop(); })
            .on('template', function (tpl) { return p.push(tpl); })
            .on('end', function () {
            throw new Error("tag " + token.getText() + " not closed");
        });
        stream.start();
    },
    render: function (ctx, emitter) {
        var r, collection, _a, hash, modifiers, scope, collection_1, collection_1_1, item, e_1_1;
        var e_1, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    r = this.liquid.renderer;
                    _a = toEnumerable;
                    return [4 /*yield*/, evalToken(this.collection, ctx)];
                case 1:
                    collection = _a.apply(void 0, [_c.sent()]);
                    if (!!collection.length) return [3 /*break*/, 3];
                    return [4 /*yield*/, r.renderTemplates(this.elseTemplates, ctx, emitter)];
                case 2:
                    _c.sent();
                    return [2 /*return*/];
                case 3: return [4 /*yield*/, this.hash.render(ctx)];
                case 4:
                    hash = _c.sent();
                    modifiers = this.liquid.options.orderedFilterParameters
                        ? Object.keys(hash).filter(function (x) { return MODIFIERS.includes(x); })
                        : MODIFIERS.filter(function (x) { return hash[x] !== undefined; });
                    collection = modifiers.reduce(function (collection, modifier) {
                        if (modifier === 'offset')
                            return offset(collection, hash['offset']);
                        if (modifier === 'limit')
                            return limit(collection, hash['limit']);
                        return reversed(collection);
                    }, collection);
                    scope = { forloop: new ForloopDrop(collection.length, this.collection.getText(), this.variable) };
                    ctx.push(scope);
                    _c.label = 5;
                case 5:
                    _c.trys.push([5, 10, 11, 12]);
                    collection_1 = __values(collection), collection_1_1 = collection_1.next();
                    _c.label = 6;
                case 6:
                    if (!!collection_1_1.done) return [3 /*break*/, 9];
                    item = collection_1_1.value;
                    scope[this.variable] = item;
                    return [4 /*yield*/, r.renderTemplates(this.templates, ctx, emitter)];
                case 7:
                    _c.sent();
                    if (emitter['break']) {
                        emitter['break'] = false;
                        return [3 /*break*/, 9];
                    }
                    emitter['continue'] = false;
                    scope.forloop.next();
                    _c.label = 8;
                case 8:
                    collection_1_1 = collection_1.next();
                    return [3 /*break*/, 6];
                case 9: return [3 /*break*/, 12];
                case 10:
                    e_1_1 = _c.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 11:
                    try {
                        if (collection_1_1 && !collection_1_1.done && (_b = collection_1.return)) _b.call(collection_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 12:
                    ctx.pop();
                    return [2 /*return*/];
            }
        });
    }
};
function reversed(arr) {
    return __spread(arr).reverse();
}
function offset(arr, count) {
    return arr.slice(count);
}
function limit(arr, count) {
    return arr.slice(0, count);
}

var capture = {
    parse: function (tagToken, remainTokens) {
        var _this = this;
        var tokenizer = new Tokenizer(tagToken.args, this.liquid.options.operatorsTrie);
        this.variable = readVariableName(tokenizer);
        assert(this.variable, function () { return tagToken.args + " not valid identifier"; });
        this.templates = [];
        var stream = this.liquid.parser.parseStream(remainTokens);
        stream.on('tag:endcapture', function () { return stream.stop(); })
            .on('template', function (tpl) { return _this.templates.push(tpl); })
            .on('end', function () {
            throw new Error("tag " + tagToken.getText() + " not closed");
        });
        stream.start();
    },
    render: function (ctx) {
        var r, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    r = this.liquid.renderer;
                    return [4 /*yield*/, r.renderTemplates(this.templates, ctx)];
                case 1:
                    html = _a.sent();
                    ctx.bottom()[this.variable] = html;
                    return [2 /*return*/];
            }
        });
    }
};
function readVariableName(tokenizer) {
    var word = tokenizer.readIdentifier().content;
    if (word)
        return word;
    var quoted = tokenizer.readQuoted();
    if (quoted)
        return evalQuotedToken(quoted);
}

var Case = {
    parse: function (tagToken, remainTokens) {
        var _this = this;
        this.cond = new Value(tagToken.args, this.liquid);
        this.cases = [];
        this.elseTemplates = [];
        var p = [];
        var stream = this.liquid.parser.parseStream(remainTokens)
            .on('tag:when', function (token) {
            p = [];
            var tokenizer = new Tokenizer(token.args, _this.liquid.options.operatorsTrie);
            while (!tokenizer.end()) {
                var value = tokenizer.readValue();
                _this.cases.push({
                    val: value,
                    templates: p
                });
                tokenizer.readTo(',');
            }
        })
            .on('tag:else', function () { return (p = _this.elseTemplates); })
            .on('tag:endcase', function () { return stream.stop(); })
            .on('template', function (tpl) { return p.push(tpl); })
            .on('end', function () {
            throw new Error("tag " + tagToken.getText() + " not closed");
        });
        stream.start();
    },
    render: function (ctx, emitter) {
        var r, cond, _a, _b, _c, branch, val, e_1_1;
        var e_1, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    r = this.liquid.renderer;
                    _a = toValue;
                    return [4 /*yield*/, this.cond.value(ctx, ctx.opts.lenientIf)];
                case 1:
                    cond = _a.apply(void 0, [_e.sent()]);
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 7, 8, 9]);
                    _b = __values(this.cases), _c = _b.next();
                    _e.label = 3;
                case 3:
                    if (!!_c.done) return [3 /*break*/, 6];
                    branch = _c.value;
                    val = evalToken(branch.val, ctx, ctx.opts.lenientIf);
                    if (!(val === cond)) return [3 /*break*/, 5];
                    return [4 /*yield*/, r.renderTemplates(branch.templates, ctx, emitter)];
                case 4:
                    _e.sent();
                    return [2 /*return*/];
                case 5:
                    _c = _b.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 9: return [4 /*yield*/, r.renderTemplates(this.elseTemplates, ctx, emitter)];
                case 10:
                    _e.sent();
                    return [2 /*return*/];
            }
        });
    }
};

var comment = {
    parse: function (tagToken, remainTokens) {
        var stream = this.liquid.parser.parseStream(remainTokens);
        stream
            .on('token', function (token) {
            if (token.name === 'endcomment')
                stream.stop();
        })
            .on('end', function () {
            throw new Error("tag " + tagToken.getText() + " not closed");
        });
        stream.start();
    }
};

var BlockMode;
(function (BlockMode) {
    /* store rendered html into blocks */
    BlockMode[BlockMode["OUTPUT"] = 0] = "OUTPUT";
    /* output rendered html directly */
    BlockMode[BlockMode["STORE"] = 1] = "STORE";
})(BlockMode || (BlockMode = {}));
var BlockMode$1 = BlockMode;

var render = {
    parseFilePath: parseFilePath,
    renderFilePath: renderFilePath,
    parse: function (token) {
        var args = token.args;
        var tokenizer = new Tokenizer(args, this.liquid.options.operatorsTrie);
        this['file'] = this.parseFilePath(tokenizer, this.liquid);
        this['currentFile'] = token.file;
        while (!tokenizer.end()) {
            tokenizer.skipBlank();
            var begin = tokenizer.p;
            var keyword = tokenizer.readIdentifier();
            if (keyword.content === 'with' || keyword.content === 'for') {
                tokenizer.skipBlank();
                // can be normal key/value pair, like "with: true"
                if (tokenizer.peek() !== ':') {
                    var value = tokenizer.readValue();
                    // can be normal key, like "with,"
                    if (value) {
                        var beforeAs = tokenizer.p;
                        var asStr = tokenizer.readIdentifier();
                        var alias = void 0;
                        if (asStr.content === 'as')
                            alias = tokenizer.readIdentifier();
                        else
                            tokenizer.p = beforeAs;
                        this[keyword.content] = { value: value, alias: alias && alias.content };
                        tokenizer.skipBlank();
                        if (tokenizer.peek() === ',')
                            tokenizer.advance();
                        // matched!
                        continue;
                    }
                }
            }
            /**
             * restore cursor if with/for not matched
             */
            tokenizer.p = begin;
            break;
        }
        this.hash = new Hash(tokenizer.remaining());
    },
    render: function (ctx, emitter) {
        var _a, liquid, hash, filepath, childCtx, scope, _b, _c, _d, value, alias, _e, value, alias, collection, collection_1, collection_1_1, item, templates, e_1_1, templates;
        var e_1, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _a = this, liquid = _a.liquid, hash = _a.hash;
                    return [4 /*yield*/, this.renderFilePath(this['file'], ctx, liquid)];
                case 1:
                    filepath = _g.sent();
                    assert(filepath, function () { return "illegal filename \"" + filepath + "\""; });
                    childCtx = new Context({}, ctx.opts, ctx.sync);
                    scope = childCtx.bottom();
                    _b = __assign;
                    _c = [scope];
                    return [4 /*yield*/, hash.render(ctx)];
                case 2:
                    _b.apply(void 0, _c.concat([_g.sent()]));
                    if (this['with']) {
                        _d = this['with'], value = _d.value, alias = _d.alias;
                        scope[alias || filepath] = evalToken(value, ctx);
                    }
                    if (!this['for']) return [3 /*break*/, 12];
                    _e = this['for'], value = _e.value, alias = _e.alias;
                    collection = evalToken(value, ctx);
                    collection = toEnumerable(collection);
                    scope['forloop'] = new ForloopDrop(collection.length, value.getText(), alias);
                    _g.label = 3;
                case 3:
                    _g.trys.push([3, 9, 10, 11]);
                    collection_1 = __values(collection), collection_1_1 = collection_1.next();
                    _g.label = 4;
                case 4:
                    if (!!collection_1_1.done) return [3 /*break*/, 8];
                    item = collection_1_1.value;
                    scope[alias] = item;
                    return [4 /*yield*/, liquid._parsePartialFile(filepath, childCtx.sync, this['currentFile'])];
                case 5:
                    templates = _g.sent();
                    return [4 /*yield*/, liquid.renderer.renderTemplates(templates, childCtx, emitter)];
                case 6:
                    _g.sent();
                    scope['forloop'].next();
                    _g.label = 7;
                case 7:
                    collection_1_1 = collection_1.next();
                    return [3 /*break*/, 4];
                case 8: return [3 /*break*/, 11];
                case 9:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 11];
                case 10:
                    try {
                        if (collection_1_1 && !collection_1_1.done && (_f = collection_1.return)) _f.call(collection_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 11: return [3 /*break*/, 15];
                case 12: return [4 /*yield*/, liquid._parsePartialFile(filepath, childCtx.sync, this['currentFile'])];
                case 13:
                    templates = _g.sent();
                    return [4 /*yield*/, liquid.renderer.renderTemplates(templates, childCtx, emitter)];
                case 14:
                    _g.sent();
                    _g.label = 15;
                case 15: return [2 /*return*/];
            }
        });
    }
};
/**
 * @return null for "none",
 * @return Template[] for quoted with tags and/or filters
 * @return Token for expression (not quoted)
 * @throws TypeError if cannot read next token
 */
function parseFilePath(tokenizer, liquid) {
    if (liquid.options.dynamicPartials) {
        var file = tokenizer.readValue();
        if (file === undefined)
            throw new TypeError("illegal argument \"" + tokenizer.input + "\"");
        if (file.getText() === 'none')
            return null;
        if (isQuotedToken(file)) {
            // for filenames like "files/{{file}}", eval as liquid template
            var tpls = liquid.parse(evalQuotedToken(file));
            // for filenames like "files/file.liquid", extract the string directly
            if (tpls.length === 1 && isHTMLToken(tpls[0].token))
                return tpls[0].token.getContent();
            return tpls;
        }
        return file;
    }
    var filepath = tokenizer.readFileName().getText();
    return filepath === 'none' ? null : filepath;
}
function renderFilePath(file, ctx, liquid) {
    if (typeof file === 'string')
        return file;
    if (Array.isArray(file))
        return liquid.renderer.renderTemplates(file, ctx);
    return evalToken(file, ctx);
}

var include = {
    parseFilePath: parseFilePath,
    renderFilePath: renderFilePath,
    parse: function (token) {
        var args = token.args;
        var tokenizer = new Tokenizer(args, this.liquid.options.operatorsTrie);
        this['file'] = this.parseFilePath(tokenizer, this.liquid);
        this['currentFile'] = token.file;
        var begin = tokenizer.p;
        var withStr = tokenizer.readIdentifier();
        if (withStr.content === 'with') {
            tokenizer.skipBlank();
            if (tokenizer.peek() !== ':') {
                this.withVar = tokenizer.readValue();
            }
            else
                tokenizer.p = begin;
        }
        else
            tokenizer.p = begin;
        this.hash = new Hash(tokenizer.remaining());
    },
    render: function (ctx, emitter) {
        var _a, liquid, hash, withVar, renderer, filepath, saved, scope, templates;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = this, liquid = _a.liquid, hash = _a.hash, withVar = _a.withVar;
                    renderer = liquid.renderer;
                    return [4 /*yield*/, this.renderFilePath(this['file'], ctx, liquid)];
                case 1:
                    filepath = _b.sent();
                    assert(filepath, function () { return "illegal filename \"" + filepath + "\""; });
                    saved = ctx.saveRegister('blocks', 'blockMode');
                    ctx.setRegister('blocks', {});
                    ctx.setRegister('blockMode', BlockMode$1.OUTPUT);
                    return [4 /*yield*/, hash.render(ctx)];
                case 2:
                    scope = _b.sent();
                    if (withVar)
                        scope[filepath] = evalToken(withVar, ctx);
                    return [4 /*yield*/, liquid._parsePartialFile(filepath, ctx.sync, this['currentFile'])];
                case 3:
                    templates = _b.sent();
                    ctx.push(scope);
                    return [4 /*yield*/, renderer.renderTemplates(templates, ctx, emitter)];
                case 4:
                    _b.sent();
                    ctx.pop();
                    ctx.restoreRegister(saved);
                    return [2 /*return*/];
            }
        });
    }
};

var decrement = {
    parse: function (token) {
        var tokenizer = new Tokenizer(token.args, this.liquid.options.operatorsTrie);
        this.variable = tokenizer.readIdentifier().content;
    },
    render: function (context, emitter) {
        var scope = context.environments;
        if (!isNumber(scope[this.variable])) {
            scope[this.variable] = 0;
        }
        emitter.write(stringify(--scope[this.variable]));
    }
};

var cycle = {
    parse: function (tagToken) {
        var tokenizer = new Tokenizer(tagToken.args, this.liquid.options.operatorsTrie);
        var group = tokenizer.readValue();
        tokenizer.skipBlank();
        this.candidates = [];
        if (group) {
            if (tokenizer.peek() === ':') {
                this.group = group;
                tokenizer.advance();
            }
            else
                this.candidates.push(group);
        }
        while (!tokenizer.end()) {
            var value = tokenizer.readValue();
            if (value)
                this.candidates.push(value);
            tokenizer.readTo(',');
        }
        assert(this.candidates.length, function () { return "empty candidates: " + tagToken.getText(); });
    },
    render: function (ctx, emitter) {
        var group = evalToken(this.group, ctx);
        var fingerprint = "cycle:" + group + ":" + this.candidates.join(',');
        var groups = ctx.getRegister('cycle');
        var idx = groups[fingerprint];
        if (idx === undefined) {
            idx = groups[fingerprint] = 0;
        }
        var candidate = this.candidates[idx];
        idx = (idx + 1) % this.candidates.length;
        groups[fingerprint] = idx;
        var html = evalToken(candidate, ctx);
        emitter.write(html);
    }
};

var If = {
    parse: function (tagToken, remainTokens) {
        var _this = this;
        this.branches = [];
        this.elseTemplates = [];
        var p;
        this.liquid.parser.parseStream(remainTokens)
            .on('start', function () { return _this.branches.push({
            predicate: new Value(tagToken.args, _this.liquid),
            templates: (p = [])
        }); })
            .on('tag:elsif', function (token) { return _this.branches.push({
            predicate: new Value(token.args, _this.liquid),
            templates: (p = [])
        }); })
            .on('tag:else', function () { return (p = _this.elseTemplates); })
            .on('tag:endif', function () { this.stop(); })
            .on('template', function (tpl) { return p.push(tpl); })
            .on('end', function () { throw new Error("tag " + tagToken.getText() + " not closed"); })
            .start();
    },
    render: function (ctx, emitter) {
        var r, _a, _b, _c, predicate, templates, value, e_1_1;
        var e_1, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    r = this.liquid.renderer;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 7, 8, 9]);
                    _a = __values(this.branches), _b = _a.next();
                    _e.label = 2;
                case 2:
                    if (!!_b.done) return [3 /*break*/, 6];
                    _c = _b.value, predicate = _c.predicate, templates = _c.templates;
                    return [4 /*yield*/, predicate.value(ctx, ctx.opts.lenientIf)];
                case 3:
                    value = _e.sent();
                    if (!isTruthy(value, ctx)) return [3 /*break*/, 5];
                    return [4 /*yield*/, r.renderTemplates(templates, ctx, emitter)];
                case 4:
                    _e.sent();
                    return [2 /*return*/];
                case 5:
                    _b = _a.next();
                    return [3 /*break*/, 2];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 9: return [4 /*yield*/, r.renderTemplates(this.elseTemplates, ctx, emitter)];
                case 10:
                    _e.sent();
                    return [2 /*return*/];
            }
        });
    }
};

var increment = {
    parse: function (token) {
        var tokenizer = new Tokenizer(token.args, this.liquid.options.operatorsTrie);
        this.variable = tokenizer.readIdentifier().content;
    },
    render: function (context, emitter) {
        var scope = context.environments;
        if (!isNumber(scope[this.variable])) {
            scope[this.variable] = 0;
        }
        var val = scope[this.variable];
        scope[this.variable]++;
        emitter.write(stringify(val));
    }
};

var layout = {
    parseFilePath: parseFilePath,
    renderFilePath: renderFilePath,
    parse: function (token, remainTokens) {
        var tokenizer = new Tokenizer(token.args, this.liquid.options.operatorsTrie);
        this['file'] = this.parseFilePath(tokenizer, this.liquid);
        this['currentFile'] = token.file;
        this.hash = new Hash(tokenizer.remaining());
        this.tpls = this.liquid.parser.parseTokens(remainTokens);
    },
    render: function (ctx, emitter) {
        var _a, liquid, hash, file, renderer, filepath, templates, html, blocks, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = this, liquid = _a.liquid, hash = _a.hash, file = _a.file;
                    renderer = liquid.renderer;
                    if (!(file === null)) return [3 /*break*/, 2];
                    ctx.setRegister('blockMode', BlockMode$1.OUTPUT);
                    return [4 /*yield*/, renderer.renderTemplates(this.tpls, ctx, emitter)];
                case 1:
                    _d.sent();
                    return [2 /*return*/];
                case 2: return [4 /*yield*/, this.renderFilePath(this['file'], ctx, liquid)];
                case 3:
                    filepath = _d.sent();
                    assert(filepath, function () { return "illegal filename \"" + filepath + "\""; });
                    return [4 /*yield*/, liquid._parseLayoutFile(filepath, ctx.sync, this['currentFile'])
                        // render remaining contents and store rendered results
                    ];
                case 4:
                    templates = _d.sent();
                    // render remaining contents and store rendered results
                    ctx.setRegister('blockMode', BlockMode$1.STORE);
                    return [4 /*yield*/, renderer.renderTemplates(this.tpls, ctx)];
                case 5:
                    html = _d.sent();
                    blocks = ctx.getRegister('blocks');
                    // set whole content to anonymous block if anonymous doesn't specified
                    if (blocks[''] === undefined)
                        blocks[''] = function (parent, emitter) { return emitter.write(html); };
                    ctx.setRegister('blockMode', BlockMode$1.OUTPUT);
                    // render the layout file use stored blocks
                    _c = (_b = ctx).push;
                    return [4 /*yield*/, hash.render(ctx)];
                case 6:
                    // render the layout file use stored blocks
                    _c.apply(_b, [_d.sent()]);
                    return [4 /*yield*/, renderer.renderTemplates(templates, ctx, emitter)];
                case 7:
                    _d.sent();
                    ctx.pop();
                    return [2 /*return*/];
            }
        });
    }
};

var BlockDrop = /** @class */ (function (_super) {
    __extends(BlockDrop, _super);
    function BlockDrop(
    // the block render from layout template
    superBlockRender) {
        if (superBlockRender === void 0) { superBlockRender = function () { return ''; }; }
        var _this = _super.call(this) || this;
        _this.superBlockRender = superBlockRender;
        return _this;
    }
    /**
     * Provide parent access in child block by
     * {{ block.super }}
     */
    BlockDrop.prototype.super = function () {
        return this.superBlockRender();
    };
    return BlockDrop;
}(Drop));

var block = {
    parse: function (token, remainTokens) {
        var _this = this;
        var match = /\w+/.exec(token.args);
        this.block = match ? match[0] : '';
        this.tpls = [];
        this.liquid.parser.parseStream(remainTokens)
            .on('tag:endblock', function () { this.stop(); })
            .on('template', function (tpl) { return _this.tpls.push(tpl); })
            .on('end', function () { throw new Error("tag " + token.getText() + " not closed"); })
            .start();
    },
    render: function (ctx, emitter) {
        var blockRender;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockRender = this.getBlockRender(ctx);
                    if (!(ctx.getRegister('blockMode') === BlockMode$1.STORE)) return [3 /*break*/, 1];
                    ctx.getRegister('blocks')[this.block] = blockRender;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, blockRender(new BlockDrop(), emitter)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    },
    getBlockRender: function (ctx) {
        var _a = this, liquid = _a.liquid, tpls = _a.tpls;
        var renderChild = ctx.getRegister('blocks')[this.block];
        var renderCurrent = function (superBlock, emitter) {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // add {{ block.super }} support when rendering
                        ctx.push({ block: superBlock });
                        return [4 /*yield*/, liquid.renderer.renderTemplates(tpls, ctx, emitter)];
                    case 1:
                        _a.sent();
                        ctx.pop();
                        return [2 /*return*/];
                }
            });
        };
        return renderChild
            ? function (superBlock, emitter) { return renderChild(new BlockDrop(function () { return renderCurrent(superBlock, emitter); }), emitter); }
            : renderCurrent;
    }
};

var raw = {
    parse: function (tagToken, remainTokens) {
        var _this = this;
        this.tokens = [];
        var stream = this.liquid.parser.parseStream(remainTokens);
        stream
            .on('token', function (token) {
            if (token.name === 'endraw')
                stream.stop();
            else
                _this.tokens.push(token);
        })
            .on('end', function () {
            throw new Error("tag " + tagToken.getText() + " not closed");
        });
        stream.start();
    },
    render: function () {
        return this.tokens.map(function (token) { return token.getText(); }).join('');
    }
};

var TablerowloopDrop = /** @class */ (function (_super) {
    __extends(TablerowloopDrop, _super);
    function TablerowloopDrop(length, cols, collection, variable) {
        var _this = _super.call(this, length, collection, variable) || this;
        _this.length = length;
        _this.cols = cols;
        return _this;
    }
    TablerowloopDrop.prototype.row = function () {
        return Math.floor(this.i / this.cols) + 1;
    };
    TablerowloopDrop.prototype.col0 = function () {
        return (this.i % this.cols);
    };
    TablerowloopDrop.prototype.col = function () {
        return this.col0() + 1;
    };
    TablerowloopDrop.prototype.col_first = function () {
        return this.col0() === 0;
    };
    TablerowloopDrop.prototype.col_last = function () {
        return this.col() === this.cols;
    };
    return TablerowloopDrop;
}(ForloopDrop));

var tablerow = {
    parse: function (tagToken, remainTokens) {
        var _this = this;
        var tokenizer = new Tokenizer(tagToken.args, this.liquid.options.operatorsTrie);
        var variable = tokenizer.readIdentifier();
        tokenizer.skipBlank();
        var tmp = tokenizer.readIdentifier();
        assert(tmp && tmp.content === 'in', function () { return "illegal tag: " + tagToken.getText(); });
        this.variable = variable.content;
        this.collection = tokenizer.readValue();
        this.hash = new Hash(tokenizer.remaining());
        this.templates = [];
        var p;
        var stream = this.liquid.parser.parseStream(remainTokens)
            .on('start', function () { return (p = _this.templates); })
            .on('tag:endtablerow', function () { return stream.stop(); })
            .on('template', function (tpl) { return p.push(tpl); })
            .on('end', function () {
            throw new Error("tag " + tagToken.getText() + " not closed");
        });
        stream.start();
    },
    render: function (ctx, emitter) {
        var collection, _a, hash, offset, limit, cols, r, tablerowloop, scope, idx;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = toEnumerable;
                    return [4 /*yield*/, evalToken(this.collection, ctx)];
                case 1:
                    collection = _a.apply(void 0, [_b.sent()]);
                    return [4 /*yield*/, this.hash.render(ctx)];
                case 2:
                    hash = _b.sent();
                    offset = hash.offset || 0;
                    limit = (hash.limit === undefined) ? collection.length : hash.limit;
                    collection = collection.slice(offset, offset + limit);
                    cols = hash.cols || collection.length;
                    r = this.liquid.renderer;
                    tablerowloop = new TablerowloopDrop(collection.length, cols, this.collection.getText(), this.variable);
                    scope = { tablerowloop: tablerowloop };
                    ctx.push(scope);
                    idx = 0;
                    _b.label = 3;
                case 3:
                    if (!(idx < collection.length)) return [3 /*break*/, 6];
                    scope[this.variable] = collection[idx];
                    if (tablerowloop.col0() === 0) {
                        if (tablerowloop.row() !== 1)
                            emitter.write('</tr>');
                        emitter.write("<tr class=\"row" + tablerowloop.row() + "\">");
                    }
                    emitter.write("<td class=\"col" + tablerowloop.col() + "\">");
                    return [4 /*yield*/, r.renderTemplates(this.templates, ctx, emitter)];
                case 4:
                    _b.sent();
                    emitter.write('</td>');
                    _b.label = 5;
                case 5:
                    idx++, tablerowloop.next();
                    return [3 /*break*/, 3];
                case 6:
                    if (collection.length)
                        emitter.write('</tr>');
                    ctx.pop();
                    return [2 /*return*/];
            }
        });
    }
};

var unless = {
    parse: function (tagToken, remainTokens) {
        var _this = this;
        this.branches = [];
        this.elseTemplates = [];
        var p;
        this.liquid.parser.parseStream(remainTokens)
            .on('start', function () { return _this.branches.push({
            predicate: new Value(tagToken.args, _this.liquid),
            test: isFalsy,
            templates: (p = [])
        }); })
            .on('tag:elsif', function (token) { return _this.branches.push({
            predicate: new Value(token.args, _this.liquid),
            test: isTruthy,
            templates: (p = [])
        }); })
            .on('tag:else', function () { return (p = _this.elseTemplates); })
            .on('tag:endunless', function () { this.stop(); })
            .on('template', function (tpl) { return p.push(tpl); })
            .on('end', function () { throw new Error("tag " + tagToken.getText() + " not closed"); })
            .start();
    },
    render: function (ctx, emitter) {
        var r, _a, _b, _c, predicate, test_1, templates, value, e_1_1;
        var e_1, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    r = this.liquid.renderer;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 7, 8, 9]);
                    _a = __values(this.branches), _b = _a.next();
                    _e.label = 2;
                case 2:
                    if (!!_b.done) return [3 /*break*/, 6];
                    _c = _b.value, predicate = _c.predicate, test_1 = _c.test, templates = _c.templates;
                    return [4 /*yield*/, predicate.value(ctx, ctx.opts.lenientIf)];
                case 3:
                    value = _e.sent();
                    if (!test_1(value, ctx)) return [3 /*break*/, 5];
                    return [4 /*yield*/, r.renderTemplates(templates, ctx, emitter)];
                case 4:
                    _e.sent();
                    return [2 /*return*/];
                case 5:
                    _b = _a.next();
                    return [3 /*break*/, 2];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 9: return [4 /*yield*/, r.renderTemplates(this.elseTemplates, ctx, emitter)];
                case 10:
                    _e.sent();
                    return [2 /*return*/];
            }
        });
    }
};

var Break = {
    render: function (ctx, emitter) {
        emitter['break'] = true;
    }
};

var Continue = {
    render: function (ctx, emitter) {
        emitter['continue'] = true;
    }
};

var tags = {
    assign: assign, 'for': For, capture: capture, 'case': Case, comment: comment, include: include, render: render, decrement: decrement, increment: increment, cycle: cycle, 'if': If, layout: layout, block: block, raw: raw, tablerow: tablerow, unless: unless, 'break': Break, 'continue': Continue
};

var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&#34;',
    "'": '&#39;'
};
var unescapeMap = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&#34;': '"',
    '&#39;': "'"
};
function escape(str) {
    return stringify(str).replace(/&|<|>|"|'/g, function (m) { return escapeMap[m]; });
}
function unescape(str) {
    return String(str).replace(/&(amp|lt|gt|#34|#39);/g, function (m) { return unescapeMap[m]; });
}
function escapeOnce(str) {
    return escape(unescape(str));
}
function newlineToBr(v) {
    return v.replace(/\n/g, '<br />\n');
}
function stripHtml(v) {
    return v.replace(/<script.*?<\/script>|<!--.*?-->|<style.*?<\/style>|<.*?>/g, '');
}

var abs = Math.abs;
var atLeast = Math.max;
var atMost = Math.min;
var ceil = Math.ceil;
var dividedBy = function (v, arg) { return v / arg; };
var floor = Math.floor;
var minus = function (v, arg) { return v - arg; };
var modulo = function (v, arg) { return v % arg; };
var times = function (v, arg) { return v * arg; };
function round(v, arg) {
    if (arg === void 0) { arg = 0; }
    var amp = Math.pow(10, arg);
    return Math.round(v * amp) / amp;
}
function plus(v, arg) {
    return Number(v) + Number(arg);
}
function sortNatural(input, property) {
    if (!input || !input.sort)
        return [];
    if (property !== undefined) {
        return __spread(input).sort(function (lhs, rhs) { return caseInsensitiveCompare(lhs[property], rhs[property]); });
    }
    return __spread(input).sort(caseInsensitiveCompare);
}

var urlDecode = function (x) { return x.split('+').map(decodeURIComponent).join(' '); };
var urlEncode = function (x) { return x.split(' ').map(encodeURIComponent).join('+'); };

var join = function (v, arg) { return v.join(arg === undefined ? ' ' : arg); };
var last$1 = function (v) { return isArray(v) ? last(v) : ''; };
var first = function (v) { return isArray(v) ? v[0] : ''; };
var reverse = function (v) { return __spread(v).reverse(); };
function sort(arr, property) {
    var _this = this;
    var getValue = function (obj) { return property ? _this.context.getFromScope(obj, property.split('.')) : obj; };
    return toArray(arr).sort(function (lhs, rhs) {
        lhs = getValue(lhs);
        rhs = getValue(rhs);
        return lhs < rhs ? -1 : (lhs > rhs ? 1 : 0);
    });
}
var size = function (v) { return (v && v.length) || 0; };
function map(arr, property) {
    var _this = this;
    return toArray(arr).map(function (obj) { return _this.context.getFromScope(obj, property.split('.')); });
}
function compact(arr) {
    return toArray(arr).filter(function (x) { return !isNil(x); });
}
function concat(v, arg) {
    return toArray(v).concat(arg);
}
function slice(v, begin, length) {
    if (length === void 0) { length = 1; }
    begin = begin < 0 ? v.length + begin : begin;
    return v.slice(begin, begin + length);
}
function where(arr, property, expected) {
    var _this = this;
    return toArray(arr).filter(function (obj) {
        var value = _this.context.getFromScope(obj, String(property).split('.'));
        return expected === undefined ? isTruthy(value, _this.context) : value === expected;
    });
}
function uniq(arr) {
    var u = {};
    return (arr || []).filter(function (val) {
        if (u.hasOwnProperty(String(val)))
            return false;
        u[String(val)] = true;
        return true;
    });
}

var rFormat = /%([-_0^#:]+)?(\d+)?([EO])?(.)/;
var monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
];
var dayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];
var monthNamesShort = monthNames.map(abbr);
var dayNamesShort = dayNames.map(abbr);
var suffixes = {
    1: 'st',
    2: 'nd',
    3: 'rd',
    'default': 'th'
};
function abbr(str) {
    return str.slice(0, 3);
}
// prototype extensions
function daysInMonth(d) {
    var feb = isLeapYear(d) ? 29 : 28;
    return [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}
function getDayOfYear(d) {
    var num = 0;
    for (var i = 0; i < d.getMonth(); ++i) {
        num += daysInMonth(d)[i];
    }
    return num + d.getDate();
}
function getWeekOfYear(d, startDay) {
    // Skip to startDay of this week
    var now = getDayOfYear(d) + (startDay - d.getDay());
    // Find the first startDay of the year
    var jan1 = new Date(d.getFullYear(), 0, 1);
    var then = (7 - jan1.getDay() + startDay);
    return String(Math.floor((now - then) / 7) + 1);
}
function isLeapYear(d) {
    var year = d.getFullYear();
    return !!((year & 3) === 0 && (year % 100 || (year % 400 === 0 && year)));
}
function getSuffix(d) {
    var str = d.getDate().toString();
    var index = parseInt(str.slice(-1));
    return suffixes[index] || suffixes['default'];
}
function century(d) {
    return parseInt(d.getFullYear().toString().substring(0, 2), 10);
}
// default to 0
var padWidths = {
    d: 2,
    e: 2,
    H: 2,
    I: 2,
    j: 3,
    k: 2,
    l: 2,
    L: 3,
    m: 2,
    M: 2,
    S: 2,
    U: 2,
    W: 2
};
// default to '0'
var padChars = {
    a: ' ',
    A: ' ',
    b: ' ',
    B: ' ',
    c: ' ',
    e: ' ',
    k: ' ',
    l: ' ',
    p: ' ',
    P: ' '
};
var formatCodes = {
    a: function (d) { return dayNamesShort[d.getDay()]; },
    A: function (d) { return dayNames[d.getDay()]; },
    b: function (d) { return monthNamesShort[d.getMonth()]; },
    B: function (d) { return monthNames[d.getMonth()]; },
    c: function (d) { return d.toLocaleString(); },
    C: function (d) { return century(d); },
    d: function (d) { return d.getDate(); },
    e: function (d) { return d.getDate(); },
    H: function (d) { return d.getHours(); },
    I: function (d) { return String(d.getHours() % 12 || 12); },
    j: function (d) { return getDayOfYear(d); },
    k: function (d) { return d.getHours(); },
    l: function (d) { return String(d.getHours() % 12 || 12); },
    L: function (d) { return d.getMilliseconds(); },
    m: function (d) { return d.getMonth() + 1; },
    M: function (d) { return d.getMinutes(); },
    N: function (d, opts) {
        var width = Number(opts.width) || 9;
        var str = String(d.getMilliseconds()).substr(0, width);
        return padEnd(str, width, '0');
    },
    p: function (d) { return (d.getHours() < 12 ? 'AM' : 'PM'); },
    P: function (d) { return (d.getHours() < 12 ? 'am' : 'pm'); },
    q: function (d) { return getSuffix(d); },
    s: function (d) { return Math.round(d.valueOf() / 1000); },
    S: function (d) { return d.getSeconds(); },
    u: function (d) { return d.getDay() || 7; },
    U: function (d) { return getWeekOfYear(d, 0); },
    w: function (d) { return d.getDay(); },
    W: function (d) { return getWeekOfYear(d, 1); },
    x: function (d) { return d.toLocaleDateString(); },
    X: function (d) { return d.toLocaleTimeString(); },
    y: function (d) { return d.getFullYear().toString().substring(2, 4); },
    Y: function (d) { return d.getFullYear(); },
    z: function (d, opts) {
        var nOffset = Math.abs(d.getTimezoneOffset());
        var h = Math.floor(nOffset / 60);
        var m = nOffset % 60;
        return (d.getTimezoneOffset() > 0 ? '-' : '+') +
            padStart(h, 2, '0') +
            (opts.flags[':'] ? ':' : '') +
            padStart(m, 2, '0');
    },
    't': function () { return '\t'; },
    'n': function () { return '\n'; },
    '%': function () { return '%'; }
};
formatCodes.h = formatCodes.b;
function strftime (d, formatStr) {
    var output = '';
    var remaining = formatStr;
    var match;
    while ((match = rFormat.exec(remaining))) {
        output += remaining.slice(0, match.index);
        remaining = remaining.slice(match.index + match[0].length);
        output += format(d, match);
    }
    return output + remaining;
}
function format(d, match) {
    var e_1, _a;
    var _b = __read(match, 5), input = _b[0], _c = _b[1], flagStr = _c === void 0 ? '' : _c, width = _b[2], modifier = _b[3], conversion = _b[4];
    var convert = formatCodes[conversion];
    if (!convert)
        return input;
    var flags = {};
    try {
        for (var flagStr_1 = __values(flagStr), flagStr_1_1 = flagStr_1.next(); !flagStr_1_1.done; flagStr_1_1 = flagStr_1.next()) {
            var flag = flagStr_1_1.value;
            flags[flag] = true;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (flagStr_1_1 && !flagStr_1_1.done && (_a = flagStr_1.return)) _a.call(flagStr_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var ret = String(convert(d, { flags: flags, width: width, modifier: modifier }));
    var padChar = padChars[conversion] || '0';
    var padWidth = width || padWidths[conversion] || 0;
    if (flags['^'])
        ret = ret.toUpperCase();
    else if (flags['#'])
        ret = changeCase(ret);
    if (flags['_'])
        padChar = ' ';
    else if (flags['0'])
        padChar = '0';
    if (flags['-'])
        padWidth = 0;
    return padStart(ret, padWidth, padChar);
}

// one minute in milliseconds
var OneMinute = 60000;
var hostTimezoneOffset = new Date().getTimezoneOffset();
var ISO8601_TIMEZONE_PATTERN = /([zZ]|([+-])(\d{2}):(\d{2}))$/;
/**
 * A date implementation with timezone info, just like Ruby date
 *
 * Implementation:
 * - create a Date offset by it's timezone difference, avoiding overriding a bunch of methods
 * - rewrite getTimezoneOffset() to trick strftime
 */
var TimezoneDate = /** @class */ (function (_super) {
    __extends(TimezoneDate, _super);
    function TimezoneDate(init, timezoneOffset) {
        var _this = this;
        if (init instanceof TimezoneDate)
            return init;
        var diff = (hostTimezoneOffset - timezoneOffset) * OneMinute;
        var time = new Date(init).getTime() + diff;
        _this = _super.call(this, time) || this;
        _this.timezoneOffset = timezoneOffset;
        return _this;
    }
    TimezoneDate.prototype.getTimezoneOffset = function () {
        return this.timezoneOffset;
    };
    /**
     * Create a Date object fixed to it's declared Timezone. Both
     * - 2021-08-06T02:29:00.000Z and
     * - 2021-08-06T02:29:00.000+08:00
     * will always be displayed as
     * - 2021-08-06 02:29:00
     * regardless timezoneOffset in JavaScript realm
     *
     * The implementation hack:
     * Instead of calling `.getMonth()`/`.getUTCMonth()` respect to `preserveTimezones`,
     * we create a different Date to trick strftime, it's both simpler and more performant.
     * Given that a template is expected to be parsed fewer times than rendered.
     */
    TimezoneDate.createDateFixedToTimezone = function (dateString) {
        var m = dateString.match(ISO8601_TIMEZONE_PATTERN);
        // representing a UTC timestamp
        if (m && m[1] === 'Z') {
            return new TimezoneDate(+new Date(dateString), 0);
        }
        // has a timezone specified
        if (m && m[2] && m[3] && m[4]) {
            var _a = __read(m, 5), sign = _a[2], hours = _a[3], minutes = _a[4];
            var delta = (sign === '+' ? -1 : 1) * (parseInt(hours, 10) * 60 + parseInt(minutes, 10));
            return new TimezoneDate(+new Date(dateString), delta);
        }
        return new Date(dateString);
    };
    return TimezoneDate;
}(Date));

function date(v, arg) {
    var opts = this.context.opts;
    var date;
    if (v === 'now' || v === 'today') {
        date = new Date();
    }
    else if (isNumber(v)) {
        date = new Date(v * 1000);
    }
    else if (isString(v)) {
        if (/^\d+$/.test(v)) {
            date = new Date(+v * 1000);
        }
        else if (opts.preserveTimezones) {
            date = TimezoneDate.createDateFixedToTimezone(v);
        }
        else {
            date = new Date(v);
        }
    }
    else {
        date = v;
    }
    if (!isValidDate(date))
        return v;
    if (opts.hasOwnProperty('timezoneOffset')) {
        date = new TimezoneDate(date, opts.timezoneOffset);
    }
    return strftime(date, arg);
}
function isValidDate(date) {
    return date instanceof Date && !isNaN(date.getTime());
}

function Default(v, arg) {
    if (isArray(v) || isString(v))
        return v.length ? v : arg;
    return isFalsy(toValue(v), this.context) ? arg : v;
}
function json(v) {
    return JSON.stringify(v);
}

/**
 * String related filters
 *
 * * prefer stringify() to String() since `undefined`, `null` should eval ''
 */
function append(v, arg) {
    assert(arguments.length === 2, 'append expect 2 arguments');
    return stringify(v) + stringify(arg);
}
function prepend(v, arg) {
    assert(arguments.length === 2, 'prepend expect 2 arguments');
    return stringify(arg) + stringify(v);
}
function lstrip(v) {
    return stringify(v).replace(/^\s+/, '');
}
function downcase(v) {
    return stringify(v).toLowerCase();
}
function upcase(str) {
    return stringify(str).toUpperCase();
}
function remove(v, arg) {
    return stringify(v).split(String(arg)).join('');
}
function removeFirst(v, l) {
    return stringify(v).replace(String(l), '');
}
function rstrip(str) {
    return stringify(str).replace(/\s+$/, '');
}
function split(v, arg) {
    return stringify(v).split(String(arg));
}
function strip(v) {
    return stringify(v).trim();
}
function stripNewlines(v) {
    return stringify(v).replace(/\n/g, '');
}
function capitalize(str) {
    str = stringify(str);
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
function replace(v, pattern, replacement) {
    return stringify(v).split(String(pattern)).join(replacement);
}
function replaceFirst(v, arg1, arg2) {
    return stringify(v).replace(String(arg1), arg2);
}
function truncate(v, l, o) {
    if (l === void 0) { l = 50; }
    if (o === void 0) { o = '...'; }
    v = stringify(v);
    if (v.length <= l)
        return v;
    return v.substr(0, l - o.length) + o;
}
function truncatewords(v, l, o) {
    if (l === void 0) { l = 15; }
    if (o === void 0) { o = '...'; }
    var arr = v.split(/\s+/);
    var ret = arr.slice(0, l).join(' ');
    if (arr.length >= l)
        ret += o;
    return ret;
}



var builtinFilters = /*#__PURE__*/Object.freeze({
    escape: escape,
    escapeOnce: escapeOnce,
    newlineToBr: newlineToBr,
    stripHtml: stripHtml,
    abs: abs,
    atLeast: atLeast,
    atMost: atMost,
    ceil: ceil,
    dividedBy: dividedBy,
    floor: floor,
    minus: minus,
    modulo: modulo,
    times: times,
    round: round,
    plus: plus,
    sortNatural: sortNatural,
    urlDecode: urlDecode,
    urlEncode: urlEncode,
    join: join,
    last: last$1,
    first: first,
    reverse: reverse,
    sort: sort,
    size: size,
    map: map,
    compact: compact,
    concat: concat,
    slice: slice,
    where: where,
    uniq: uniq,
    date: date,
    Default: Default,
    json: json,
    append: append,
    prepend: prepend,
    lstrip: lstrip,
    downcase: downcase,
    upcase: upcase,
    remove: remove,
    removeFirst: removeFirst,
    rstrip: rstrip,
    split: split,
    strip: strip,
    stripNewlines: stripNewlines,
    capitalize: capitalize,
    replace: replace,
    replaceFirst: replaceFirst,
    truncate: truncate,
    truncatewords: truncatewords
});

var TagMap = /** @class */ (function () {
    function TagMap() {
        this.impls = {};
    }
    TagMap.prototype.get = function (name) {
        var impl = this.impls[name];
        assert(impl, function () { return "tag \"" + name + "\" not found"; });
        return impl;
    };
    TagMap.prototype.set = function (name, impl) {
        this.impls[name] = impl;
    };
    return TagMap;
}());

var FilterMap = /** @class */ (function () {
    function FilterMap(strictFilters, liquid) {
        this.strictFilters = strictFilters;
        this.liquid = liquid;
        this.impls = {};
    }
    FilterMap.prototype.get = function (name) {
        var impl = this.impls[name];
        assert(impl || !this.strictFilters, function () { return "undefined filter: " + name; });
        return impl;
    };
    FilterMap.prototype.set = function (name, impl) {
        this.impls[name] = impl;
    };
    FilterMap.prototype.create = function (name, args) {
        return new Filter(name, this.get(name), args, this.liquid);
    };
    return FilterMap;
}());

var version = '9.28.4';
var Liquid = /** @class */ (function () {
    function Liquid(opts) {
        var _this = this;
        if (opts === void 0) { opts = {}; }
        this.options = normalize(opts);
        this.parser = new Parser(this);
        this.renderer = new Render();
        this.filters = new FilterMap(this.options.strictFilters, this);
        this.tags = new TagMap();
        forOwn(tags, function (conf, name) { return _this.registerTag(snakeCase(name), conf); });
        forOwn(builtinFilters, function (handler, name) { return _this.registerFilter(snakeCase(name), handler); });
    }
    Liquid.prototype.parse = function (html, filepath) {
        return this.parser.parse(html, filepath);
    };
    Liquid.prototype._render = function (tpl, scope, sync) {
        var ctx = new Context(scope, this.options, sync);
        return this.renderer.renderTemplates(tpl, ctx);
    };
    Liquid.prototype.render = function (tpl, scope) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, toPromise(this._render(tpl, scope, false))];
            });
        });
    };
    Liquid.prototype.renderSync = function (tpl, scope) {
        return toValue$1(this._render(tpl, scope, true));
    };
    Liquid.prototype.renderToNodeStream = function (tpl, scope) {
        var ctx = new Context(scope, this.options);
        return this.renderer.renderTemplatesToNodeStream(tpl, ctx);
    };
    Liquid.prototype._parseAndRender = function (html, scope, sync) {
        var tpl = this.parse(html);
        return this._render(tpl, scope, sync);
    };
    Liquid.prototype.parseAndRender = function (html, scope) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, toPromise(this._parseAndRender(html, scope, false))];
            });
        });
    };
    Liquid.prototype.parseAndRenderSync = function (html, scope) {
        return toValue$1(this._parseAndRender(html, scope, true));
    };
    Liquid.prototype._parsePartialFile = function (file, sync, currentFile) {
        return this.parser.parseFile(file, sync, LookupType.Partials, currentFile);
    };
    Liquid.prototype._parseLayoutFile = function (file, sync, currentFile) {
        return this.parser.parseFile(file, sync, LookupType.Layouts, currentFile);
    };
    Liquid.prototype.parseFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, toPromise(this.parser.parseFile(file, false))];
            });
        });
    };
    Liquid.prototype.parseFileSync = function (file) {
        return toValue$1(this.parser.parseFile(file, true));
    };
    Liquid.prototype.renderFile = function (file, ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var templates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.parseFile(file)];
                    case 1:
                        templates = _a.sent();
                        return [2 /*return*/, this.render(templates, ctx)];
                }
            });
        });
    };
    Liquid.prototype.renderFileSync = function (file, ctx) {
        var templates = this.parseFileSync(file);
        return this.renderSync(templates, ctx);
    };
    Liquid.prototype.renderFileToNodeStream = function (file, scope) {
        return __awaiter(this, void 0, void 0, function () {
            var templates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.parseFile(file)];
                    case 1:
                        templates = _a.sent();
                        return [2 /*return*/, this.renderToNodeStream(templates, scope)];
                }
            });
        });
    };
    Liquid.prototype._evalValue = function (str, ctx) {
        var value = new Value(str, this);
        return value.value(ctx, false);
    };
    Liquid.prototype.evalValue = function (str, ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, toPromise(this._evalValue(str, ctx))];
            });
        });
    };
    Liquid.prototype.evalValueSync = function (str, ctx) {
        return toValue$1(this._evalValue(str, ctx));
    };
    Liquid.prototype.registerFilter = function (name, filter) {
        this.filters.set(name, filter);
    };
    Liquid.prototype.registerTag = function (name, tag) {
        this.tags.set(name, tag);
    };
    Liquid.prototype.plugin = function (plugin) {
        return plugin.call(this, Liquid);
    };
    Liquid.prototype.express = function () {
        var self = this; // eslint-disable-line
        var firstCall = true;
        return function (filePath, ctx, callback) {
            var _a, _b, _c;
            if (firstCall) {
                firstCall = false;
                var dirs = normalizeDirectoryList(this.root);
                (_a = self.options.root).unshift.apply(_a, __spread(dirs));
                (_b = self.options.layouts).unshift.apply(_b, __spread(dirs));
                (_c = self.options.partials).unshift.apply(_c, __spread(dirs));
            }
            self.renderFile(filePath, ctx).then(function (html) { return callback(null, html); }, callback);
        };
    };
    return Liquid;
}());

exports.AssertionError = AssertionError;
exports.Context = Context;
exports.Drop = Drop;
exports.Expression = Expression;
exports.Hash = Hash;
exports.InternalUndefinedVariableError = InternalUndefinedVariableError;
exports.Liquid = Liquid;
exports.LiquidError = LiquidError;
exports.ParseError = ParseError;
exports.ParseStream = ParseStream;
exports.RenderError = RenderError;
exports.TagToken = TagToken;
exports.Token = Token;
exports.TokenizationError = TokenizationError;
exports.Tokenizer = Tokenizer;
exports.TypeGuards = typeGuards;
exports.UndefinedVariableError = UndefinedVariableError;
exports.Value = Value;
exports.assert = assert;
exports.createTrie = createTrie;
exports.defaultOperators = defaultOperators;
exports.evalQuotedToken = evalQuotedToken;
exports.evalToken = evalToken;
exports.isFalsy = isFalsy;
exports.isTruthy = isTruthy;
exports.toPromise = toPromise;
exports.toThenable = toThenable;
exports.toValue = toValue;
exports.version = version;


/***/ }),

/***/ 294:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(219);


/***/ }),

/***/ 219:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var net = __nccwpck_require__(808);
var tls = __nccwpck_require__(404);
var http = __nccwpck_require__(685);
var https = __nccwpck_require__(687);
var events = __nccwpck_require__(361);
var assert = __nccwpck_require__(491);
var util = __nccwpck_require__(837);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 821:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/* module decorator */ module = __nccwpck_require__.nmd(module);
module.export = fetch = (...args) => __nccwpck_require__.e(/* import() */ 841).then(__nccwpck_require__.bind(__nccwpck_require__, 841)).then(({default: fetch}) => fetch(...args))


/***/ }),

/***/ 32:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GITHUB_GRAPHQL_URL = void 0;
exports.GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";


/***/ }),

/***/ 637:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getContributed = void 0;
const fetch_js_1 = __importDefault(__nccwpck_require__(821));
const const_js_1 = __nccwpck_require__(32);
function getContributedByYear(token, user, year) {
    return __awaiter(this, void 0, void 0, function* () {
        const headers = {
            Authorization: `bearer ${token}`,
        };
        const body = {
            query: `query {
            user(login: "${user.login}") {
              contributionsCollection(from: "${year}-01-01T00:00:00", to: "${year}-12-31T23:59:59") {
                pullRequestContributionsByRepository(maxRepositories: 100, excludeFirst:true) {
                  repository {
                    name
                    url
                    stargazerCount
                    isPrivate
                    description
                    owner {
                      login
                    }
                  }
                  contributions(first: 10) {
                    nodes {
                      occurredAt
                      pullRequest {
                        title
                        url
                      }
                    }
                  }
                }
              }
            }
          }`,
        };
        const response = yield (0, fetch_js_1.default)(const_js_1.GITHUB_GRAPHQL_URL, {
            method: "POST",
            body: JSON.stringify(body),
            headers: headers,
        });
        return response.json();
    });
}
function queryContributed(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const createdAt = new Date(input.user.createdAt);
        const nowDate = new Date();
        const startYear = createdAt.getFullYear();
        const endYear = nowDate.getFullYear();
        let contributedPromiseArray = [];
        for (let year = startYear; year <= endYear; year++) {
            contributedPromiseArray.push(getContributedByYear(input.token, input.user, year));
        }
        return Promise.all(contributedPromiseArray).then((results) => {
            const contributionsRepoArrays = results.map((response) => response.data.user.contributionsCollection
                .pullRequestContributionsByRepository);
            return contributionsRepoArrays
                .flat(Infinity)
                .map((r) => {
                let repo = r.repository;
                repo.contributions = r.contributions.nodes;
                return repo;
            })
                .filter((r) => !r.isPrivate);
        });
    });
}
function getContributed(input) {
    return __awaiter(this, void 0, void 0, function* () {
        let contributed = yield queryContributed(input);
        // remove duplicated
        contributed = contributed.filter((value, index, self) => index === self.findIndex((t) => t.url === value.url));
        switch (input.orderBy) {
            case "STARGAZERS":
                contributed = contributed.sort((a, b) => b.stargazerCount - a.stargazerCount);
                break;
            case "OCCURRED_AT":
                contributed = contributed.sort((a, b) => {
                    var _a, _b;
                    return new Date((_a = b.contributes[0]) === null || _a === void 0 ? void 0 : _a.occurredAt).getTime() -
                        new Date((_b = a.contributes[0]) === null || _b === void 0 ? void 0 : _b.occurredAt).getTime();
                });
                break;
            default:
        }
        return contributed.slice(0, input.limit);
    });
}
exports.getContributed = getContributed;


/***/ }),

/***/ 625:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRepositories = void 0;
const fetch_js_1 = __importDefault(__nccwpck_require__(821));
const const_js_1 = __nccwpck_require__(32);
function queryRepositories(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const headers = {
            Authorization: `bearer ${input.token}`,
        };
        const body = {
            query: `query {
            user(login: "${input.user.login}") {
              repositories(first: ${input.limit * 2}, orderBy: {field: ${input.orderBy}, direction: DESC}) {
                nodes {
                  name
                  url
                  stargazerCount
                  isPrivate
                  description
                }
              }
            }
          }`,
        };
        const response = yield (0, fetch_js_1.default)(const_js_1.GITHUB_GRAPHQL_URL, {
            method: "POST",
            body: JSON.stringify(body),
            headers: headers,
        });
        const data = yield response.json();
        return data;
    });
}
function getRepositories(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = yield queryRepositories(input);
        return query.data.user.repositories.nodes
            .filter((r) => !r.isPrivate)
            .slice(0, input.limit);
    });
}
exports.getRepositories = getRepositories;


/***/ }),

/***/ 604:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUsername = void 0;
const fetch_js_1 = __importDefault(__nccwpck_require__(821));
const const_js_1 = __nccwpck_require__(32);
function queryUsername(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const headers = {
            Authorization: `bearer ${token}`,
        };
        const body = {
            query: `query { 
        viewer { 
          login
          createdAt
        }
      }`,
        };
        const response = yield (0, fetch_js_1.default)(const_js_1.GITHUB_GRAPHQL_URL, {
            method: "POST",
            body: JSON.stringify(body),
            headers: headers,
        });
        const data = yield response.json();
        return data;
    });
}
function getUsername(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = yield queryUsername(token);
        return username.data.viewer;
    });
}
exports.getUsername = getUsername;


/***/ }),

/***/ 502:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handler = void 0;
const get_username_js_1 = __nccwpck_require__(604);
const get_repositories_js_1 = __nccwpck_require__(625);
const get_contributed_js_1 = __nccwpck_require__(637);
const liquidjs_1 = __nccwpck_require__(385);
const fs = __importStar(__nccwpck_require__(147));
function handler(cfg) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, get_username_js_1.getUsername)(cfg.token);
        const repositories = yield (0, get_repositories_js_1.getRepositories)({
            token: cfg.token,
            user,
            limit: cfg.limit,
            orderBy: cfg.repositoriesOrderBy,
        });
        const contributed = yield (0, get_contributed_js_1.getContributed)({
            token: cfg.token,
            user,
            limit: cfg.limit,
            orderBy: cfg.contributedOrderBy,
        });
        fs.readFile(cfg.templateFile, "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const engine = new liquidjs_1.Liquid();
            const tpl = engine.parse(data);
            engine.render(tpl, { repositories, contributed }).then((result) => {
                try {
                    fs.writeFileSync(cfg.renderFile, result);
                    console.log("render successful");
                }
                catch (err) {
                    console.error(err);
                }
            });
        });
    });
}
exports.handler = handler;


/***/ }),

/***/ 399:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core = __importStar(__nccwpck_require__(186));
const handler_js_1 = __nccwpck_require__(502);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const token = core.getInput("github-token", { required: true });
        const templateFile = core.getInput("template-file", { required: true });
        const renderFile = core.getInput("render-file", { required: true });
        const limit = parseInt(core.getInput("limit", { required: true }));
        const repositoriesOrderBy = core.getInput("repositories-order-by", {
            required: true,
        });
        const contributedOrderBy = core.getInput("contributed-order-by", {
            required: true,
        });
        (0, handler_js_1.handler)({
            token,
            templateFile,
            renderFile,
            limit,
            repositoriesOrderBy,
            contributedOrderBy,
        });
    });
}
run();


/***/ }),

/***/ 491:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 300:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 685:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 808:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 561:
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ 849:
/***/ ((module) => {

"use strict";
module.exports = require("node:http");

/***/ }),

/***/ 286:
/***/ ((module) => {

"use strict";
module.exports = require("node:https");

/***/ }),

/***/ 411:
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ 742:
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),

/***/ 492:
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ 477:
/***/ ((module) => {

"use strict";
module.exports = require("node:stream/web");

/***/ }),

/***/ 20:
/***/ ((module) => {

"use strict";
module.exports = require("node:url");

/***/ }),

/***/ 261:
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ 86:
/***/ ((module) => {

"use strict";
module.exports = require("node:worker_threads");

/***/ }),

/***/ 628:
/***/ ((module) => {

"use strict";
module.exports = require("node:zlib");

/***/ }),

/***/ 37:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 781:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 404:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__nccwpck_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__nccwpck_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__nccwpck_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__nccwpck_require__.f).reduce((promises, key) => {
/******/ 				__nccwpck_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__nccwpck_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".index.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__nccwpck_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			179: 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__nccwpck_require__.o(moreModules, moduleId)) {
/******/ 					__nccwpck_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__nccwpck_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 		
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__nccwpck_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("./" + __nccwpck_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(399);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;