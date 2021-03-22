package com.example.demo111;

import java.io.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet(name = "status", value = "/status")
public class Status extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.getOutputStream().println("<html><p style=\"color:red\">Application is running </p></html>");
    }

}
