import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { OAuthService } from './oauth.service';

@Controller('oauth')
export class OAuthController {
  constructor(
    private authService: AuthService,
    private oauthService: OAuthService,
  ) {}
  @Get('authorize')
  async authorize(@Query() query, @Res() response: Response) {
    const { response_type, client_id, redirect_uri, scope, state } = query;

    // Here, instead of directly handling the authentication,
    // render an HTML form for the user to input their credentials
    response.render('auth-form', { client_id, redirect_uri, scope, state });
  }

  @Post('/authenticate')
  async authenticateUser(@Body() body, @Res() res: Response) {
    const { user_email, password, client_id, redirect_uri, scope, state } =
      body;

    // Authenticate the user with the provided credentials
    const isAuthenticated = await this.authService.validateUser(
      user_email,
      password,
    );

    if (isAuthenticated) {
      // If authenticated, proceed to generate an authorization code
      const authorizationCode =
        await this.oauthService.generateAuthorizationCode(
          client_id,
          user_email,
          redirect_uri,
          scope,
        );

      // Redirect to the client's redirect URI with the authorization code and state
      const redirectUrl = new URL(redirect_uri);
      redirectUrl.searchParams.append('code', authorizationCode);
      redirectUrl.searchParams.append('state', state);
      res.redirect(redirectUrl.toString());
    } else {
      // If authentication fails, handle the error (e.g., re-render the form with an error message)
      res.render('auth-form', {
        error: 'Invalid credentials',
        client_id,
        redirect_uri,
        scope,
        state,
      });
    }
  }

  @Get('callback')
  callback(@Req() req: Request) {
    // Handle callback logic here
  }

  @Get('token')
  token(@Req() req: Request) {
    // Handle token generation logic here
  }
}
