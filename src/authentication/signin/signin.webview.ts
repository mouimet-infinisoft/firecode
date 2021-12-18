export const fireSignInWebView = () => `<!DOCTYPE html>
<html>

<head>
    <style>
        .loginPage__KGxIy {
            background-color: rgba(255, 255, 255, 0);
            padding: 47.5px 50.5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        
        .loginFormv2__UKdG9 {
            height: 350px;
            width: 500px;
        }
        
        .loginFormv2__iip1B {
            padding: 10px 9px 23.6px 10px;
            display: flex;
            align-items: flex-start;
        }
        
        .formContainer__1MCta {
            background-color: rgba(255, 255, 255, 1);
            border-radius: 17px;
            padding: 14px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 2px solid rgba(7, 75, 182, 1);
        }
        
        .infinisoftLogoOfficiel1__J4Iiv {
            width: 449px;
            height: 77.4px;
            margin-bottom: 16px;
        }
        
        .email__a2oAw {
            background-color: rgba(227, 227, 227, 1);
            margin-bottom: 16px;
            overflow: hidden;
            border-radius: 32px;
            padding: 0 13px 0 21px;
            display: flex;
            align-items: flex-start;
            height: 49px;
            width: 403px;
            border: 2px solid rgba(7, 75, 182, 1);
        }
        
        .iconContainer__LTbFd {
            margin-right: 25px;
            padding: 14.33px 0.66px 13.34px 0.67px;
            display: flex;
            align-items: center;
        }
        
        .iconVector__3wBGO {
            padding: 0 0 1.33px;
            position: relative;
        }
        
        .vector__Ks2qD {
            background-color: rgba(47, 136, 255, 1);
            position: absolute;
            right: 0.67px;
            top: 16px;
            border: 4px solid rgba(0, 0, 0, 1);
        }
        
        .flexWrapperOne__djQ7f {
            background-size: 100% 100%;
            background-position: center;
            background-image: url("https://static.overlay-tech.com/assets/fd078708-c6cb-45cd-abf5-00b3930ab738.svg");
            padding: 0 0 4px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            position: relative;
        }
        
        .vectorTwo__WltIW {
            height: 62.5%;
            align-self: stretch;
            margin-bottom: 2px;
            object-fit: cover;
        }
        
        .vectorThree__XpS9A {
            width: 15%;
            height: 25%;
            margin-left: 20px;
        }
        
        .input__JttBd {
            width: 350px;
            height: 49px;
        }
        
        .password__sn4Ob {
            background-color: rgba(227, 227, 227, 1);
            margin-bottom: 16px;
            overflow: hidden;
            border-radius: 32px;
            padding: 0 19px 0 20.5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 49px;
            width: 397.5px;
            border: 2px solid rgba(7, 75, 182, 1);
        }
        
        .iconContainerTwo__bvEmA {
            padding: 9.5px 2.5px 11.5px;
            display: flex;
            align-items: center;
        }
        
        .vectorFour__zJmGv {
            width: 24px;
            height: 28px;
        }
        
        input {
            background-color: transparent;
            border: none;
            color: black;
            font-size: 1.5rem;
        }
        
        input:focus-visible {
            outline: none;
        }
        
        .inputTwo__lEI4m {
            width: 343px;
            height: 48.4px;
        }
        
        .buttonSignin__bEnjk {
            background-color: rgba(7, 75, 182, 1);
            overflow: hidden;
            border-radius: 32px;
            padding: 5px 174px 6px 158px;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
            display: flex;
            align-items: center;
            height: 42px;
            box-shadow: none;
            ;
        }
        
        .signIn__S3yWB {
            font-family: "Roboto";
            font-size: 36px;
            font-weight: 400;
            line-height: normal;
            color: rgba(255, 255, 255, 1);
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="loginPage__KGxIy" data-ovrl-l-id="08793044-727b-472e-beda-8ccf8cc1e39e">
        <div class="loginFormv2__UKdG9 loginFormv2__iip1B" data-ovrl-i-id="a59dfe9d-2e83-4189-bcc3-6197ed6b2c37" data-ovrl-l-id="daddb4f1-f4f2-402c-821f-ac2cdceaa794">
            <div class="formContainer__1MCta" data-ovrl-l-id="6296a6ab-f17f-44c4-b8f9-9f7e675df36d">
                <img alt="" class="infinisoftLogoOfficiel1__J4Iiv" data-ovrl-a-id="09ac7e30-a20a-464f-9b3f-f843508294a6" data-ovrl-l-id="1b6be2f2-a04f-4050-adbe-026d6de385e9" data-ovrl-p-id="4da9856b-d6f9-49bc-ba7e-69ea25fc0802" src="https://static.overlay-tech.com/assets/4130eafa-1186-4217-95a5-4f5fe2480865.png"
                />
                <div class="email__a2oAw" data-ovrl-l-id="110fd641-d717-4e59-a02b-4153a65f0c6c">
                    <div class="iconContainer__LTbFd" data-ovrl-l-id="0374f850-9c2c-4d62-8839-252c00fdfc2a">
                        <div class="iconVector__3wBGO" data-ovrl-l-id="9dcd4da5-46a0-4f0c-be28-fbe82d9f8e11">
                            <div class="vector__Ks2qD" data-ovrl-l-id="f55a905b-ede6-450d-862a-0aa1d9264bcd"></div>
                            <div class="flexWrapperOne__djQ7f" data-ovrl-l-id="cffb83bd-ba6c-4534-b16f-73e0adaea1c1">
                                <img alt="" class="vectorTwo__WltIW" data-ovrl-a-id="8a698ced-26b7-43c3-9e2d-5b28b3711665" data-ovrl-l-id="03a62be6-64b2-437c-b3d3-accaee90c18c" data-ovrl-p-id="b9a39f62-816d-46ad-8874-e25f3c35b4d7" src="https://static.overlay-tech.com/assets/7541268b-c99b-4547-a41c-37d28b18840e.svg"
                                /><img alt="" class="vectorThree__XpS9A" data-ovrl-a-id="e86bac4c-1102-4511-b033-ead6d1c6e5b6" data-ovrl-l-id="1c7657da-20f8-44c5-b09d-219ca05f1eba" data-ovrl-p-id="52a6c483-4518-43a4-937f-ef823eb3a271"
                                    src="https://static.overlay-tech.com/assets/8af3edf0-1138-41ef-9153-1f274722825d.svg" />
                            </div>
                        </div>
                    </div>
                    <input id="email" type="text" class="input__JttBd" data-ovrl-l-id="c96579f3-4545-44c9-8ab3-0449be9dd11f" />
                </div>
                <div class="password__sn4Ob" data-ovrl-l-id="8219f370-82f7-40a7-822b-ce1a722dd117">
                    <div class="iconContainerTwo__bvEmA" data-ovrl-l-id="4aa2568d-8939-4c6b-9454-38148429ee58">
                        <img alt="" class="vectorFour__zJmGv" data-ovrl-a-id="6b6e974e-aacc-46e1-9783-928d85a46845" data-ovrl-l-id="971088ab-3933-4fca-bb52-dc16105b53b3" data-ovrl-p-id="1775cffa-4828-4b35-8c95-c468ac48bb95" src="https://static.overlay-tech.com/assets/c2a84517-b172-4f18-97c4-971f9ce29cb8.svg"
                        />
                    </div>
                    <input id="password" type='password' class="inputTwo__lEI4m" data-ovrl-l-id="68268d35-6965-4d5c-94c4-9856537e914e" />
                </div>
                <button id="mybutton" class="buttonSignin__bEnjk" data-ovrl-l-id="3851d7cf-3620-4e8a-910f-786ffd23af71">
                    <p class="signIn__S3yWB" data-ovrl-l-id="c78a8be1-6c99-4fdf-999b-9c39a74d246e" data-ovrl-p-id="c7215b99-82f7-4537-ba20-bf58bb92f366">
                        Sign In
                    </p>
                </button>
            </div>
        </div>
    </div>


    <script>
        const btn = document.getElementById("mybutton");
        const email = document.getElementById("email");
        const password = document.getElementById("password");

        const vscode = acquireVsCodeApi();

        btn.addEventListener("click", (event) => {
            const message = {
                command: "login",
                credentials: {
                    email: email.value,
                    password: password.value,
                },
            };

            vscode.postMessage(message);
        });
    </script>
</body>

</html>
`