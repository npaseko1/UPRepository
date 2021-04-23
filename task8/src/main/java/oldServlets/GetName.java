package com.example.demo;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "GetName", value = "/get")
public class GetName extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String str = request.getQueryString();
        if (str.length() <= 100) {
            response.getOutputStream().println("Name is " + str.substring(5, str.length()));

        } else {
            response.getOutputStream().println("Too Long Name");
        }
    }

}
