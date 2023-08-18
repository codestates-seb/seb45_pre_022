package com.seb45_022.preproject.server.global.security.config;

import com.seb45_022.preproject.server.domain.member.service.MemberService;
import com.seb45_022.preproject.server.domain.refreshToken.service.RefreshTokenService;
import com.seb45_022.preproject.server.global.security.filter.JwtAuthenticationFilter;
import com.seb45_022.preproject.server.global.security.filter.JwtVerificationFilter;
import com.seb45_022.preproject.server.global.security.handler.*;
import com.seb45_022.preproject.server.global.security.jwt.JwtTokenizer;
import com.seb45_022.preproject.server.global.security.utils.CustomAuthorityUtils;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity(debug = true)
public class SecurityConfig {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final MemberService memberService;
    private final RefreshTokenService refreshTokenService;

    @Getter
    @Value("${jwt.aws_ec2_url}")
    private String ec2_url;

    @Getter
    @Value("${jwt.aws_buket_url}")
    private String buket_url;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeninedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-resources/**").permitAll() //스웨거 관련설정
                        .antMatchers(HttpMethod.POST, "/members/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/members").permitAll()
                        .antMatchers(HttpMethod.GET, "/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/questions/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/questions/**").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/questions/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/questions/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/comments/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/comments/**").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/comments/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/comments/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/answers/**").hasAnyRole("USER")
                        .antMatchers(HttpMethod.GET, "/answers/**").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/answers/**").hasAnyRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/answers/**").hasAnyRole("USER")
                        .anyRequest().permitAll()
                )
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer, customAuthorityUtils, memberService, refreshTokenService))
                );
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:8080", "http://localhost:3000",ec2_url, buket_url));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, refreshTokenService);
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, customAuthorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }
}
