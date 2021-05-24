package com.coretex.web.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.web.reactive.config.ResourceHandlerRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableWebFlux
public class ApplicationConfigurerAdapter implements WebFluxConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        final String[] staticLocations = {"/resources/static/"};
        final String[] indexLocations = new String[staticLocations.length];
        for (int i = 0; i < staticLocations.length; i++) {
            indexLocations[i] = staticLocations[i] + "/app/index.html";
        }

        registry.addResourceHandler("/**",
                "/*.json",
                "/*.css",
                "/*.js",
                "/*.gif",
                "/*.css",
                "/*.ico",
                "/*.js",
                "/*.map",
                "/*.png",
                "/*.jpg",
                "/*.svg",
                "/*.woff",
                "/*.woff2",
                "/*.eot",
                "/*.otf",
                "/*.ttf",
                "/*/*.json",
                "/*/*.css",
                "/*/*.ico",
                "/*/*.js",
                "/*/*.gif",
                "/*/*.map",
                "/*/*.png",
                "/*/*.jpg",
                "/*/*.svg",
                "/*/*.woff",
                "/*/*.woff2",
                "/*/*.eot",
                "/*/*.otf",
                "/*/*.ttf")
                .addResourceLocations(staticLocations)
                .setCacheControl(CacheControl.maxAge(100000, TimeUnit.SECONDS));

        registry.addResourceHandler(
                "/*.html",
                "/*.json",
                "/*/*.html",
                "/*/*.json")
                .addResourceLocations(staticLocations)
                .setCacheControl(CacheControl.maxAge(600, TimeUnit.SECONDS));

    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("*").allowedMethods("*").allowedHeaders("*");
    }

}