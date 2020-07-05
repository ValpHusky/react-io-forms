// Type definitions for react-io-forms v1.2.0+
    // Project: https://github.com/ValpHusky/react-io-forms
    // Definitions by: Sergio Gomez (ValpHusky) <https://github.com/ValpHusky>
    import * as React from "react";

    // export const withIO = (type: string, registry?: string = 'default') => (Component: React.ComponentClass) => React.ReactNode;

    export class InputError {
        /**
         * Shortcut static method
         * @throws {InputError}
         * */
        static throw(message: string, names?: string | Array<string>): InputError;

        /**
         * Class Constructor
         * @param {string} message The message to display.
         * @param {string | Array<string>} [names] The IOInput names to target
         * @param {Object} [data] This data object carries information regarding the IOInput.
         */
        constructor(message: string, names?: string | Array<string>, data?: Object );

        /** 
         * Returns the array of IOInput names for this InputError 
         * */
        names(): Array<string>;
        /** 
         * Returns the first name of IOInput names for this InputError 
         * */
        name(): string;
        /** 
         * Returns if the InputError list of names includes the given IOInput name
         * */
        includes(field: string): boolean;
        /** 
         * Returns the message for this InputError 
         * */
        message(): string;
        /** 
         * Returns the array of IOInput names for this InputError 
         * @override
         * */
        toString(): string;
    }

    export interface IOInputOptions {
        label: string,
        value: any
    }

    export type Validators = string | RegExp | ((value:any) => boolean) | ((value: any) => { valid: boolean, message: string }) | boolean 

    export interface IOInputProps {
        /** Name of the input. This information is required and it is used as a reference for all the async processes like message propagation and data collection through IOInputForm */
        name: string;
        /** 
         * Sets the default value of the IOInput. This value will be set when the reset process triggers.
         * If this value is a Function this function will be executed and the return value will be set as default value.
         * */
        defaultValue?: any | Function;
        /** Sets the value into the input */
        value?: any;
        /** Type of Input to be rendered */
        type?: string;
        /** Indicates this input must not be serialized during the value recollection performed by the IOForm Context */
        exclude?: boolean;
        /**
         * Indicates this input must be included into the serialization even if the input has the "empty value" set at that moment
         * NOTE: This prop cannot coexist with "required" or "exclude" (it would be ignored).
         * */
        include?: boolean;
        /** 
        * This value can be either an array or a string (same as a single element array). The string(s) represent a key from the validation object given by the ValidatorContext or a regular expression to test the value against.
        * Optionally the regular expresion can be given as it is (RegExp object).
        * If an array is given, the validations will be runned one after another in the given orther. For the input to be valid all validations must pass.
        * If a function is give, the validation will consist on running the value agains the function. The given function must return either true or false to indicate the validation passed
        * If a boolean is given, the validation will automatically resolve on the boolean's value. This is useful if you want to have full control over the invalid/valid state
        */
        validate?: Validators | Validators[]
        /** A flag that indicates the value must not be null or empty to be a valid input */
        required?: boolean
        /** This flag forces the state/className for a valid input (Normally this happens internally when the value meets the validation criteria) */
        valid?: boolean,
        /** This flag forces the state/className for an invalid input (Normally this happens internally when the value does NOT meet the validation criteria) */
        invalid?: boolean,
        /** This string forces a message into the message propagation channel. If present it will override any internally generated message */
        message?: string,
        /** This function is called when an input changes its value and the value passes all the necessary validations */
        onValue?: (value: any, name?: string) => any;
        /** This function is called when an input changes its value for any value */
        onChange?: (value?: any, name?: string) => any;
        /** This function is called when the input processes generate a new message. The function receives as arguments the "message" itself and the "field" which is the name given at the "name" prop */
        onMessage?: (message?: string, name?: string) => any;
        /** This function is called when the input fails a validation. The function is called with the message and the field name as arguments */
        onInvalid?: (error?: InputError, name?: string) => any;
        /** Message to send when the input value resolves in "valid" */
        validMessage?: string;
        /** Function to use as filter for any upcoming value from the I/O flow to be set */
        filterIn?: (value: any, name?: string) => any;
        /** Function to use as filter for any outgoing value from the I/O flow to be serialized */
        filterOut?: (value: any, name?: string) => any;
        /** Fields to link. Any value change will be propagated to the fields within the same IOForm that match the link name and the field name */
        link?: string | string[];
        /** Options available by option selectable intpu fields. For example: Radio and Select */
        options?: IOInputOptions[];
        /** Gets the reference of the inner input */
        innerRef?: (el: HTMLElement) => void | React.MutableRefObject;
        
        [key:string]: any;
    }

    export interface IOFormProps<T> {
        /** Triggered when a IOInput type submit is clicked within the tree */
        onSubmit: ((values: T) => Promise<any>) | ((values: T) => boolean);
        /** Sets the id of the form tag element */
        id?: string;
        /** When true the form will not perform any submit. Useful to block any subsecuent submit after the first one */
        lock?: boolean;
        /** Indicates that the form should reset after a successfull submit */
        reset?: boolean;
        /** Indicates that the data should be serialized as a FormData object */
        formdata?: boolean;
        /** Triggered when validity changes; all the fields have achieved validity (true) or one them of them hasn't (false) */
        onValidity?: (state: boolean) => void
    }

    export interface IOInputMessageProps {
        for: string;
        text?: boolean;
    }

    export interface ValidationResult {
        valid: boolean;
        message?: string;
    }

    export interface ValidatorContextProps {
        /** Triggered when a IOInput in the node tree changes */
        validations?: Record<string, string | ((value: any) => boolean) | ((value: any) => ValidationResult) | RegExp | boolean>;
        /** Triggered when a IOInput type submit is clicked within the tree */
        defaultMessage?: string;
        /** Triggered when a IOInput in the node tree blurs out */
        messages?: Record<string, string> | Record<string, Function>;
        /** Default message to show in case an Input fails the required validation */
        requiredMessage?: string;
    }

    export interface RegistryLibrary {
        type: string | Array<string>,
        component: React.ComponentElement<any, any>
    }

    export interface RegistryContextProps {
        /** Name of the registry to use for all the child node IOInput's in the tree */
        name: string;
        /** Entries to add to the registry */
        entry: Array<RegistryLibrary>;
        /** Indicates that the entry will be the default entry to take when a IOInput is invoked */
        main?: boolean;
    }

    export interface IOProxyInputProps {
        ioProps: IOInputProps;
        setValue: (value: any) => void;
        value: any;
        children?: React.ReactNode | React.ReactElement;
        className?: string;
        [key: string]: any;
    }

    export interface IOBootstrap4LayoutProps extends IOProxyInputProps {
        inline?: boolean;
        prepend?: React.ReactNode | React.ReactNodeArray
        append?: React.ReactNode | React.ReactNodeArray
        label?: string;
    }


    export interface LayouterContextProps {
        layouter: string | ((Component: React.ComponentClass | React.FunctionComponent, props: IOProxyInputProps ) => React.ReactNode)
    }

    export interface WithIOInjectedProps<V=any> {
        setValue: (value: V) => Promise<void>
        value: V
        ioProps: IOInputProps
    }

    export declare class RegistryContext extends React.Component<RegistryContextProps, any>{}
    export declare class ValidatorContext extends React.Component<ValidatorContextProps, any>{}
    export declare class IOInputMessage extends React.Component<IOInputMessageProps, any>{}
    export declare class IOInput<P={}> extends React.Component<IOInputProps & P, any> {}
    export declare class LayoutContext extends React.Component<LayouterContextProps, any> {}

    export type IOInputReactHoc<P> = (component: React.ComponentType<P>) => <V=any>(props: P & IOInputProps) => JSX.Element
    export declare function withIO<P=any>(type: string): IOInputReactHoc<P>

    declare class IOForm<T=any> extends React.Component<IOFormProps<T>> {}
    export default IOForm;