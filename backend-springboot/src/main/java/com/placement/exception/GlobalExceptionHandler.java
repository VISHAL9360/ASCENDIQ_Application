package com.placement.exception;

import com.placement.payload.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> resourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        ErrorResponse message = ErrorResponse.builder()
                .statusCode(HttpStatus.NOT_FOUND.value())
                .timestamp(new Date())
                .message(ex.getMessage())
                .description(request.getDescription(false))
                .build();
        
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDeniedException(AccessDeniedException ex, WebRequest request) {
        ErrorResponse message = ErrorResponse.builder()
                .statusCode(HttpStatus.FORBIDDEN.value())
                .timestamp(new Date())
                .message("Access Denied: You do not have permission to access this resource.")
                .description(request.getDescription(false))
                .build();
        return new ResponseEntity<>(message, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex, WebRequest request) {
        String errorMessage = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));
                
        ErrorResponse message = ErrorResponse.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .timestamp(new Date())
                .message(errorMessage)
                .description(request.getDescription(false))
                .build();
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> globalExceptionHandler(Exception ex, WebRequest request) {
        ErrorResponse message = ErrorResponse.builder()
                .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .timestamp(new Date())
                .message(ex.getMessage())
                .description(request.getDescription(false))
                .build();
        
        return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
